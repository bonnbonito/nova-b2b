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
  const { signage, tempFolder, isLoading, setIsLoading, hasUploadedFile } = useAppContext();

  const fileRef = useRef(null);
  const [accessToken, setAccessToken] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(hasUploadedFile);
  const maxFiles = 5;

  const maxFilesReached = fileNames?.length >= maxFiles;

  const openIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-4"
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-4"
    >
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  );

  const [uploadProgress, setUploadProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);

  const handleFiles = async files => {
    const totalAllowedUploads = maxFiles - (fileNames?.length || 0);
    if (totalAllowedUploads <= 0) {
      alert(`You have reached the maximum upload limit of ${maxFiles} files.`);
      return;
    }

    const validFiles = Array.from(files)
      .slice(0, totalAllowedUploads)
      .filter(file => /\.(pdf|ai|png|jpg|jpeg)$/i.test(file.name));

    setFiles(prev => [...prev, ...validFiles]);
    console.log(files);

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
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
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
        const stream = file.stream();
        const reader = stream.getReader();
        const fileSize = file.size;
        let uploadedBytes = 0;

        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          uploadedBytes += value.length;
          const progress = Math.round((uploadedBytes / fileSize) * 100);
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
          setTotalProgress(progress);
        }

        const blob = new Blob(chunks);

        const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Dropbox-API-Arg': JSON.stringify(dropboxArgs),
            'Content-Type': 'application/octet-stream',
          },
          body: blob,
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
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      } finally {
        setIsLoading(false);
        setTotalProgress(0);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
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
        setFiles(prev => prev.filter((_, i) => i !== index));
        await updateSignageDelete(index);
      } else {
        throw new Error(data.error_summary || 'Unknown error during file deletion');
      }
    } catch (error) {
      console.error('Error:', error);
      setFileUrls(prev => prev.filter((_, i) => i !== index));
      setFilePaths(prev => prev.filter((_, i) => i !== index));
      setFileNames(prev => prev.filter((_, i) => i !== index));
      setFiles(prev => prev.filter((_, i) => i !== index));
      await updateSignageDelete(index);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="px-[1px] col-span-4">
        <label
          className={`uppercase font-title text-sm tracking-[1.4px] px-2 flex items-center gap-1 cursor-pointer ${
            fileError && 'text-red-600'
          }`}
          onClick={() => setOpen(!open)}
        >
          UPLOAD PDF/AI FILE {open ? openIcon : closeIcon}
        </label>

        {!open && (
          <div className="col-span-4">
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
                onDragOver={
                  !maxFilesReached && !isLoading ? handleDragOver : e => e.preventDefault()
                }
                onDragLeave={
                  !maxFilesReached && !isLoading ? handleDragLeave : e => e.preventDefault()
                }
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
        )}
      </div>

      <div className="col-span-4 mb-4">
        {(files?.length > 0 || fileNames?.length > 0) && (
          <div className="grid grid-cols-1 gap-2 text-sm border border-slate-300 p-3 bg-slate-100 mt-4">
            {/* Files being uploaded or queued */}
            {files
              .filter(file => !fileNames?.includes(file.name))
              .map((file, index) => (
                <div key={`queued-${index}`} className="grid gap-1">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      {uploadProgress[file.name] !== undefined ? (
                        <svg
                          className="w-4 h-4 text-blue-500 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {file.name}
                    </div>
                  </div>
                  {uploadProgress[file.name] !== undefined && (
                    <div className="pl-6">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Uploading...</span>
                        <span className="text-slate-600">{uploadProgress[file.name]}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${uploadProgress[file.name]}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {/* Completed Files */}
            {fileNames?.map((fileName, index) => (
              <div key={`uploaded-${index}`} className="flex gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {fileName}
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
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
