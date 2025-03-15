import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from './AppProvider';
import { processQuote } from './utils/QuoteFunctions';

export default function UploadFiles({
  itemId = null,
  setFilePaths,
  filePaths,
  setFileUrls,
  fileUrls,
  setFileNames,
  fileNames,
  fileError = false,
}) {
  const { signage, tempFolder, isLoading, setIsLoading } = useAppContext();

  const fileRef = useRef(null);
  const [accessToken, setAccessToken] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const maxFiles = 5;

  const maxFilesReached = fileNames?.length >= maxFiles;

  const handleFiles = async files => {
    const totalAllowedUploads = maxFiles - (fileNames?.length || 0);
    if (totalAllowedUploads <= 0) {
      alert(`You have reached the maximum upload limit of ${maxFiles} files.`);
      return;
    }

    const validFiles = Array.from(files)
      .slice(0, totalAllowedUploads)
      .filter(file => /\.(pdf|ai|png|jpg|jpeg)$/i.test(file.name));

    if (validFiles.length > 0) {
      for (const file of validFiles) {
        await handleFileUpload(file);
      }
    }
  };

  const handleDragOver = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  }, []);

  const handleChange = event => {
    handleFiles(event.target.files);
    event.target.value = ''; // Reset input
  };

  const getAccessToken = useCallback(async () => {
    if (accessToken) return accessToken;
    const clientId = NovaQuote.dropbox_app_key;
    const clientSecret = NovaQuote.dropbox_secret;
    const refreshToken = NovaQuote.dropbox_refresh_token;

    const url = 'https://api.dropboxapi.com/oauth2/token';
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }, [accessToken]);

  const checkAndCreateFolder = useCallback(
    async accessToken => {
      const folderPath = `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/FromClient`;

      try {
        let response = await fetch('https://api.dropboxapi.com/2/files/get_metadata', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: folderPath }),
        });

        if (response.ok) {
          return;
        }

        response = await fetch('https://api.dropboxapi.com/2/files/create_folder_v2', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: folderPath }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error_summary || 'Unknown error during folder creation');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [tempFolder]
  );

  const checkForExistingSharedLink = useCallback(async (token, filePath) => {
    const response = await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: filePath, direct_only: true }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_summary);
    }

    if (data.links && data.links.length > 0) {
      return data.links[0];
    }

    return null;
  }, []);

  const handleFileUpload = useCallback(
    async file => {
      setIsLoading(true);
      const token = await getAccessToken();

      if (!token) {
        console.error('Failed to obtain access token');
        setIsLoading(false);
        return;
      }

      await checkAndCreateFolder(token);

      const dropboxArgs = {
        path: `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/FromClient/${file.name}`,
        mode: 'add',
        autorename: true,
        mute: false,
        strict_conflict: true,
      };

      try {
        const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Dropbox-API-Arg': JSON.stringify(dropboxArgs),
            'Content-Type': 'application/octet-stream',
          },
          body: file,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadData.error_summary);

        setFilePaths(prev =>
          Array.isArray(prev) ? [...prev, uploadData.path_display] : [uploadData.path_display]
        );

        const existingLink = await checkForExistingSharedLink(token, uploadData.path_display);

        let dataLink = '';

        if (existingLink) {
          setFileUrls(prev =>
            Array.isArray(prev) ? [...prev, existingLink.url] : [existingLink.url]
          );
          dataLink = existingLink.url;
        } else {
          const sharedLinkResponse = await fetch(
            'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                path: uploadData.path_display,
                settings: {},
              }),
            }
          );

          const sharedLinkData = await sharedLinkResponse.json();
          setFileUrls(prev =>
            Array.isArray(prev) ? [...prev, sharedLinkData.url] : [sharedLinkData.url]
          );
          dataLink = sharedLinkData.url;
        }

        setFileNames(prev =>
          Array.isArray(prev) ? [...prev, uploadData.name] : [uploadData.name]
        );

        if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
          await updateSignageAdd(uploadData.name, dataLink, uploadData.path_display);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      checkAndCreateFolder,
      checkForExistingSharedLink,
      getAccessToken,
      setFileNames,
      setFilePaths,
      setFileUrls,
      setIsLoading,
      tempFolder,
    ]
  );

  const updateSignageAdd = async (dataName, dataUrls, dataPaths) => {
    if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
      const newFileNames = Array.isArray(fileUrls) ? [...fileNames, dataName] : [dataName];
      const newFileUrls = Array.isArray(fileUrls) ? [...fileUrls, dataUrls] : [dataUrls];
      const newFilePaths = Array.isArray(filePaths) ? [...filePaths, dataPaths] : [dataPaths];

      const updateDetails = {
        fileNames: newFileNames,
        filePaths: newFilePaths,
        fileUrls: newFileUrls,
      };

      const updatedSignage = signage.map(sign =>
        sign.id === itemId ? { ...sign, ...updateDetails } : sign
      );

      try {
        const formData = new FormData();
        const newSignage = JSON.stringify(updatedSignage);
        formData.append('nonce', NovaQuote.nonce);
        formData.append('action', 'update_quote');
        formData.append('signage', newSignage);
        formData.append('quote_id', NovaQuote.current_quote_id);

        const data = await processQuote(formData);

        if (data.status !== 'success') {
          throw new Error('Error updating quote');
        }

        console.log('Quote updated successfully');
      } catch (err) {
        // Handle errors
        console.log(err);
      }
    }
  };

  const updateSignageDelete = async index => {
    if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
      const newFileUrls = fileUrls.filter((_, i) => i !== index);
      const newFilePaths = filePaths.filter((_, i) => i !== index);
      const newFileNames = fileNames.filter((_, i) => i !== index);

      const updateDetails = {
        fileNames: newFileNames,
        filePaths: newFilePaths,
        fileUrls: newFileUrls,
      };

      const updatedSignage = signage.map(sign =>
        sign.id === itemId ? { ...sign, ...updateDetails } : sign
      );

      try {
        const formData = new FormData();
        const newSignage = JSON.stringify(updatedSignage);
        console.log(newSignage);
        formData.append('nonce', NovaQuote.nonce);
        formData.append('action', 'update_quote');
        formData.append('signage', newSignage);
        formData.append('quote_id', NovaQuote.current_quote_id);

        const data = await processQuote(formData);

        if (data.status !== 'success') {
          throw new Error('Error updating quote');
        }

        console.log('Quote updated successfully');
      } catch (err) {
        // Handle errors
        console.log(err);
      }
    }
  };

  const handleRemoveFile = async index => {
    setIsLoading(true);
    const currentAccessToken = accessToken || (await getAccessToken());

    if (!currentAccessToken) {
      console.error('Failed to obtain access token');
      setIsLoading(false);
      return;
    }

    const filePath = filePaths[index];

    try {
      const response = await fetch('https://api.dropboxapi.com/2/files/delete_v2', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: filePath }),
      });

      const data = await response.json();

      if (response.ok) {
        setFileUrls(prev => prev.filter((_, i) => i !== index));
        setFilePaths(prev => prev.filter((_, i) => i !== index));
        setFileNames(prev => prev.filter((_, i) => i !== index));
        await updateSignageDelete(index);
      } else {
        throw new Error(data.error_summary || 'Unknown error during file deletion');
      }
    } catch (error) {
      console.error('Error:', error);
      setFileUrls(prev => prev.filter((_, i) => i !== index));
      setFilePaths(prev => prev.filter((_, i) => i !== index));
      setFileNames(prev => prev.filter((_, i) => i !== index));
      await updateSignageDelete(index);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="px-[1px] col-span-4">
        <label
          className={`uppercase font-title text-sm tracking-[1.4px] px-2 ${
            fileError && 'text-red-600'
          }`}
        >
          UPLOAD PDF/AI FILE
        </label>
        {!maxFilesReached && (
          <div
            className={`border-dashed mt-4 p-4 w-full rounded-md border-2 transition-colors ${
              isDragging ? 'border-slate-600 bg-slate-400' : 'border-slate-900'
            } ${fileError && 'border-red-600'} ${
              maxFilesReached
                ? 'cursor-not-allowed opacity-50'
                : isLoading
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-slate-100'
            }`}
            onDragOver={!maxFilesReached && !isLoading ? handleDragOver : e => e.preventDefault()}
            onDragLeave={!maxFilesReached && !isLoading ? handleDragLeave : e => e.preventDefault()}
            onDrop={!maxFilesReached && !isLoading ? handleDrop : e => e.preventDefault()}
            onClick={() => !isLoading && !maxFilesReached && fileRef.current?.click()}
            role="button"
            tabIndex={maxFilesReached ? -1 : 0}
          >
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
              <p className="text-center mb-0">
                {isLoading ? 'Uploading...' : 'Drag and drop files here or click to upload'}
              </p>
              <p className="text-sm mt-2 mb-0">Supported formats: PDF, AI, PNG, JPG, JPEG</p>
              <p className="text-sm mb-0">Maximum files: {maxFiles}</p>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={!maxFilesReached ? handleChange : undefined}
          accept=".pdf,.ai,.png,.jpg,.jpeg"
          aria-label="File input"
          multiple
          disabled={maxFilesReached}
        />
      </div>
      <div className="col-span-4 mb-4">
        {fileNames?.length > 0 && (
          <div className="grid grid-cols-1 gap-2 text-sm border border-slate-300 p-3 bg-slate-100">
            {fileNames.map((fileName, index) => (
              <div key={index} className="flex gap-4 items-center">
                {fileName}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
