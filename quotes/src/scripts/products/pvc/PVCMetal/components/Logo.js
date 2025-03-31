import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import convert_json from '../../../../utils/ConvertJson';
import {
  getLogoPricingTablebyThickness,
  spacerPricing,
  calculateOversizeShippingAddon,
} from '../../../../utils/Pricing';
import {
  setOptions,
  spacerStandoffDefaultOptions,
  studLengthOptions,
} from '../../../../utils/SignageOptions';

import { mountingOptions } from '../../pvcOptions';

import { thicknessOptions, metalFilmOptions, pvcMetalPricing } from '../options';

import {
  EXCHANGE_RATE,
  INDOOR_NOT_WATERPROOF,
  STUD_MOUNT,
  STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { useAppContext } from '../../../../AppProvider';

const waterProofOptions = [
  {
    option: INDOOR_NOT_WATERPROOF,
  },
];

export function Logo({ item }) {
  const { signage, setSignage, setMissing, hasUploadedFile } = useAppContext();
  const [selectedThickness, setSelectedThickness] = useState(item.thickness);
  const [width, setWidth] = useState(item.width ?? '');
  const [maxWidthHeight, setMaxWidthHeight] = useState(36);

  const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
  const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
  const [usdSinglePrice, setUsdSinglePrice] = useState(item.usdSinglePrice ?? 0);
  const [cadSinglePrice, setCadSinglePrice] = useState(item.cadSinglePrice ?? 0);

  const [openColor, setOpenColor] = useState(false);
  const [pvcBase, setPvcBase] = useState(item.pvcBase ?? 'Painted - Same color as metal');
  const [customColor, setCustomColor] = useState(item.customColor ?? '');
  const [mounting, setMounting] = useState(item.mounting ?? '');

  const [studLength, setStudLength] = useState(item.studLength ?? '');
  const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(spacerStandoffDefaultOptions);
  const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
    item.spacerStandoffDistance ?? ''
  );

  const [metalFilm, setMetalFilm] = useState(item.metalFilm ?? '');

  const handleonChangeSpacerDistance = e => {
    setSpacerStandoffDistance(e.target.value);
  };

  const handleonChangeStudLength = e => {
    const target = e.target.value;
    setStudLength(target); // Directly set the value without a callback

    if (target === '1.5"') {
      setSpacerStandoffOptions([{ value: '0.5"' }, { value: '1"' }]);
      if (!['0.5"', '1"'].includes(spacerStandoffDistance)) {
        setSpacerStandoffDistance(''); // Reset if not one of the valid options
      }
    } else if (['3.2"', '4"'].includes(target)) {
      setSpacerStandoffOptions([
        { value: '0.5"' },
        { value: '1"' },
        { value: '1.5"' },
        { value: '2"' },
      ]);
      if (['3"', '4"'].includes(spacerStandoffDistance)) {
        setSpacerStandoffDistance(''); // Reset if the distance is invalid for these options
      }
    } else {
      setSpacerStandoffOptions(spacerStandoffDefaultOptions); // Reset to default if none of the conditions are met
    }

    if (target === '') {
      setSpacerStandoffDistance(''); // Always reset if the target is empty
    }
  };

  const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate ?? '');
  const handleChangeMetalLaminate = e => {
    setMetalLaminate(e.target.value);
  };

  const [fileNames, setFileNames] = useState(item.fileNames ?? []);
  const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
  const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
  const [files, setFiles] = useState(item.files ?? []);
  const [mountingSelections, setMountingSelections] = useState(mountingOptions);

  const [maxWidthOptions, setMaxWidthOptions] = useState(
    Array.from(
      {
        length: maxWidthHeight,
      },
      (_, index) => {
        const val = 4 + index;
        return (
          <option key={index} value={val}>
            {val}"
          </option>
        );
      }
    )
  );

  const [height, setHeight] = useState(item.height ?? '');
  const [comments, setComments] = useState(item.comments ?? '');
  const [waterproof, setWaterproof] = useState(INDOOR_NOT_WATERPROOF);
  const [waterProofSelections, setWaterProofSelections] = useState(waterProofOptions);

  const handleOnChangeMounting = e => {
    const target = e.target.value;
    setMounting(target);

    if (target === 'Plain' || target === 'Double-sided tape') {
      setStudLength('');
    }
    if (target !== STUD_WITH_SPACER) {
      setSpacerStandoffDistance('');
    }

    if (target === 'Double-sided tape') {
      setWaterProofSelections(
        waterProofOptions.filter(option => option.option === INDOOR_NOT_WATERPROOF)
      );
    } else {
      setWaterProofSelections(waterProofOptions);
    }
  };

  const [sets, setSets] = useState(item.sets ?? 1);

  const handleOnChangeSets = e => {
    setSets(e.target.value);
  };

  function handleComments(e) {
    setComments(e.target.value);
  }

  const handleOnChangeThickness = e => {
    const target = e.target.value;
    const selected = thicknessOptions.filter(option => option.value === target);
    setSelectedThickness(() => selected[0]);
  };

  function updateSignage() {
    const updatedSignage = signage.map(sign => {
      if (sign.id === item.id) {
        return {
          ...sign,
          comments,
          thickness: selectedThickness,
          mounting,
          waterproof,
          width,
          height,
          usdPrice,
          cadPrice,
          files,
          fileNames,
          filePaths,
          fileUrls,
          customColor,
          sets,
          studLength,
          spacerStandoffDistance,
          pvcBase,
          metalLaminate,
          usdSinglePrice,
          cadSinglePrice,
          metalFilm,
        };
      } else {
        return sign;
      }
    });
    setSignage(() => updatedSignage);
  }

  useEffect(() => {
    updateSignage();
  }, [
    comments,
    selectedThickness,
    waterproof,
    width,
    height,
    mounting,
    usdPrice,
    cadPrice,
    fileUrls,
    fileNames,
    files,
    filePaths,
    sets,
    studLength,
    spacerStandoffDistance,
    metalLaminate,
    pvcBase,
    usdSinglePrice,
    cadSinglePrice,
    metalFilm,
    hasUploadedFile,
  ]);

  const [logoPricingObject, setLogoPricingObject] = useState([]);

  useEffect(() => {
    async function fetchLogoPricing() {
      try {
        const response = await fetch(NovaQuote.logo_pricing_api + item.product);
        const data = await response.json();
        setLogoPricingObject(data);
      } catch (error) {
        console.error('Error fetching logo pricing:', error);
      }
    }

    fetchLogoPricing();
  }, []);

  const computePricing = () => {
    const tbdPricing = NovaQuote.tbd_pricing;
    if (tbdPricing) {
      return {
        singlePrice: false,
        total: false,
      };
    }
    if (!width || !height || !selectedThickness || !waterproof || logoPricingObject === null) {
      return {
        singlePrice: false,
        total: false,
      };
    }

    const logoPricing = getLogoPricingTablebyThickness(
      `${selectedThickness?.value}`,
      logoPricingObject
    );

    if (logoPricing === undefined) {
      return {
        singlePrice: false,
        total: false,
      };
    }

    let comWidth = width <= 4 ? 4 : width;
    let comHeight = height <= 4 ? 4 : height;

    const logoPricingTable = convert_json(logoPricing);
    const computed = logoPricingTable.length > 0 ? logoPricingTable[comWidth - 4][comHeight] : 0;

    let tempTotal = 0;

    tempTotal += computed;

    if (waterproof) {
      tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.03;
    }

    if (mounting) {
      tempTotal *= mounting === 'Double-sided tape' ? 1.01 : 1;
    }

    if (mounting === STUD_WITH_SPACER) {
      const spacer = spacerPricing(tempTotal);
      tempTotal += parseFloat(spacer.toFixed(2));
    }

    tempTotal *= pvcMetalPricing;

    const sizes = [width, height];
    const oversizeShippingAddon = calculateOversizeShippingAddon(sizes, tempTotal);
    tempTotal += oversizeShippingAddon;

    const total = tempTotal * parseInt(sets);

    return {
      singlePrice: tempTotal.toFixed(2) ?? 0,
      total: total?.toFixed(2) ?? 0,
    };
  };

  useEffect(() => {
    const { singlePrice, total } = computePricing();
    if (total && singlePrice) {
      setUsdPrice(total);
      setCadPrice((total * EXCHANGE_RATE).toFixed(2));
      setUsdSinglePrice(singlePrice);
      setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
    } else {
      setUsdPrice(0);
      setCadPrice(0);
      setUsdSinglePrice(0);
      setCadSinglePrice(0);
    }
  }, [width, height, selectedThickness, waterproof, mounting, pvcBase, sets, logoPricingObject]);

  const checkAndAddMissingFields = () => {
    const missingFields = [];

    if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
    if (!width) missingFields.push('Select Logo Width');
    if (!height) missingFields.push('Select Logo Height');

    if (!pvcBase) missingFields.push('Select PVC Base');

    if (!waterproof) missingFields.push('Select Environment');
    if (!mounting) missingFields.push('Select Mounting');

    if (
      mounting === STUD_WITH_SPACER ||
      mounting === STUD_MOUNT ||
      mounting === 'Pad' ||
      mounting === 'Pad - Combination All'
    ) {
      if (!studLength) missingFields.push('Select Stud Length');
    }
    if (mounting === STUD_WITH_SPACER) {
      if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
    }

    if (!hasUploadedFile) {
      if (!fileUrls || fileUrls.length === 0) missingFields.push('Upload a PDF/AI File');
    }

    if (!sets) missingFields.push('Select Quantity');

    if (missingFields.length > 0) {
      setMissing(prevMissing => {
        const existingIndex = prevMissing.findIndex(entry => entry.id === item.id);

        if (existingIndex !== -1) {
          const updatedMissing = [...prevMissing];
          updatedMissing[existingIndex] = {
            ...updatedMissing[existingIndex],
            missingFields: missingFields,
          };
          return updatedMissing;
        } else if (missingFields.length > 0) {
          return [
            ...prevMissing,
            {
              id: item.id,
              title: item.title,
              missingFields: missingFields,
            },
          ];
        }

        console.log(prevMissing);

        return prevMissing;
      });
    } else {
      setMissing(current => {
        const updatedMissing = current.filter(sign => sign.id !== item.id);
        return updatedMissing;
      });
    }
  };

  useEffect(() => {
    checkAndAddMissingFields();
  }, [
    width,
    comments,
    height,
    selectedThickness,
    mounting,
    waterproof,
    fileUrls,
    fileNames,
    files,
    filePaths,
    pvcBase,
    sets,
    studLength,
    spacerStandoffDistance,
    hasUploadedFile,
    metalFilm,
  ]);

  useEffect(() => {
    if ('Outdoor (Waterproof)' === waterproof) {
      if ('Double-sided tape' === mounting) {
        setMounting('');
      }
      let newOptions = mountingOptions.filter(option => option.value !== 'Double-sided tape');

      setMountingSelections(newOptions);
    } else {
      setMountingSelections(mountingOptions);
    }
  }, [waterproof]);

  return (
    <>
      {item.productLine && (
        <div className="py-4 mb-4">
          PRODUCT LINE:{' '}
          <span className="font-title" dangerouslySetInnerHTML={{ __html: item.productLine }} />
        </div>
      )}
      <div className="quote-grid mb-6">
        <Dropdown
          title="Thickness"
          value={item.thickness?.value}
          onChange={handleOnChangeThickness}
          options={thicknessOptions.map(thickness => (
            <option
              key={thickness.value}
              value={thickness.value}
              defaultValue={thickness === item.thickness}
            >
              {thickness.thickness}
            </option>
          ))}
        />

        <Dropdown
          title="Logo Width"
          value={width}
          onChange={e => setWidth(e.target.value)}
          options={Array.from(
            {
              length: 42,
            },
            (_, index) => {
              const val = 2 + index;
              return (
                <option key={index} value={val}>
                  {val}"
                </option>
              );
            }
          )}
        />

        <Dropdown
          title="Logo Height"
          value={height}
          onChange={e => setHeight(e.target.value)}
          options={Array.from(
            {
              length: 23,
            },
            (_, index) => {
              const val = 2 + index;
              return (
                <option key={index} value={val}>
                  {val}"
                </option>
              );
            }
          )}
        />

        <Dropdown
          title="Metal Film"
          onChange={e => setMetalFilm(e.target.value)}
          options={metalFilmOptions.map(film => (
            <option key={film} value={film} defaultValue={film == metalFilm}>
              {film}
            </option>
          ))}
          value={metalFilm}
        />

        <Dropdown
          title="PVC Base"
          onChange={e => setPvcBase(e.target.value)}
          options={<option value={pvcBase}>{pvcBase}</option>}
          value={pvcBase}
          onlyValue={true}
        />

        <Dropdown
          title="Environment"
          onChange={e => setWaterproof(e.target.value)}
          options={waterProofSelections.map(option => (
            <option
              key={option.option}
              value={option.option}
              defaultValue={option.option == item.waterproof}
            >
              {option.option}
            </option>
          ))}
          value={waterproof}
        />

        <Dropdown
          title="Mounting"
          onChange={handleOnChangeMounting}
          options={mountingSelections.map(option => (
            <option
              key={option.value}
              value={option.value}
              defaultValue={option.value === mounting}
            >
              {option.value}
            </option>
          ))}
          value={item.mounting}
        />

        {(mounting === STUD_WITH_SPACER ||
          mounting === 'Pad' ||
          mounting === 'Pad - Combination All' ||
          mounting === STUD_MOUNT) && (
          <>
            <Dropdown
              title="Stud Length"
              onChange={handleonChangeStudLength}
              options={studLengthOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  defaultValue={option.value == studLength}
                >
                  {option.value}
                </option>
              ))}
              value={studLength}
            />
          </>
        )}
        {mounting === STUD_WITH_SPACER && (
          <>
            <Dropdown
              title="STANDOFF SPACE"
              onChange={handleonChangeSpacerDistance}
              options={spacerStandoffOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  defaultValue={option.value == spacerStandoffDistance}
                >
                  {option.value}
                </option>
              ))}
              value={spacerStandoffDistance}
            />
          </>
        )}

        <Dropdown
          title="Quantity"
          onChange={handleOnChangeSets}
          options={setOptions}
          value={sets}
          onlyValue={true}
        />
      </div>

      {mounting === STUD_WITH_SPACER && (
        <div className="text-xs text-[#9F9F9F] mb-4">
          *Note: The spacer will be black (default) or match the painted sign's color.
        </div>
      )}

      <div className="quote-grid">
        <Description value={comments} handleComments={handleComments} />

        <UploadFiles
          itemId={item.id}
          setFilePaths={setFilePaths}
          setFiles={setFiles}
          filePaths={filePaths}
          fileUrls={fileUrls}
          fileNames={fileNames}
          setFileUrls={setFileUrls}
          setFileNames={setFileNames}
        />
      </div>
    </>
  );
}
