import React, { useEffect, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import convert_json from '../../../../utils/ConvertJson';
import NumberInput from '../../../../NumberInput';
import { getLogoPricingTablebyThickness, spacerPricing } from '../../../../utils/Pricing';
import {
  mountingDefaultOptions,
  setOptions,
  spacerStandoffDefaultOptions,
  studLengthOptions,
} from '../../../../utils/SignageOptions';

import { useAppContext } from '../../../../AppProvider';

import {
  ASSEMBLY_FEES,
  EXCHANGE_RATE,
  INDOOR_NOT_WATERPROOF,
  STUD_MOUNT,
  STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { thicknessOptions, metalFilmOptions, acryMetalPricing } from '../options';

const waterProofOptions = [
  {
    option: INDOOR_NOT_WATERPROOF,
  },
];

export function Logo({ item }) {
  const { signage, setSignage, setMissing, hasUploadedFile } = useAppContext();

  const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
  const [studLength, setStudLength] = useState(item.studLength ?? '');
  const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(spacerStandoffDefaultOptions);
  const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
    item.spacerStandoffDistance ?? ''
  );

  const [waterProofSelections, setWaterProofSelections] = useState(waterProofOptions);

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

  const [selectedThickness, setSelectedThickness] = useState(item.acrylicThickness ?? '');

  const [width, setWidth] = useState(item.width ?? '');
  const [height, setHeight] = useState(item.height ?? '');
  const [maxWidthHeight, setMaxWidthHeight] = useState(43);

  const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
  const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
  const [usdSinglePrice, setUsdSinglePrice] = useState(item.usdSinglePrice ?? 0);
  const [cadSinglePrice, setCadSinglePrice] = useState(item.cadSinglePrice ?? 0);

  const [metalFilm, setMetalFilm] = useState(item.metalFilm ?? '');

  const [fileNames, setFileNames] = useState(item.fileNames ?? []);
  const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
  const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
  const [files, setFiles] = useState(item.files ?? []);

  const [sets, setSets] = useState(item.sets ?? 1);

  const [logoPricingObject, setLogoPricingObject] = useState([]);

  const [maxWidthOptions, setMaxWidthOptions] = useState(
    Array.from(
      {
        length: maxWidthHeight,
      },
      (_, index) => {
        const val = 1 + index;
        return (
          <option key={index} value={val}>
            {val}"
          </option>
        );
      }
    )
  );

  const [comments, setComments] = useState(item.comments ?? '');
  const [waterproof, setWaterproof] = useState(INDOOR_NOT_WATERPROOF);
  const [mountingOptions, setMountingOptions] = useState(mountingDefaultOptions);

  const handleOnChangeMount = e => {
    const target = e.target.value;
    setSelectedMounting(target);

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

  useEffect(() => {
    let newMountingOptions = mountingDefaultOptions;

    if (selectedThickness?.value === '3') {
      newMountingOptions = mountingDefaultOptions.filter(
        option =>
          option.mounting_option !== STUD_MOUNT &&
          option.mounting_option !== STUD_WITH_SPACER &&
          option.mounting_option !== 'Pad' &&
          option.mounting_option !== 'Pad - Combination All'
      );
    } else {
      newMountingOptions = mountingDefaultOptions;
    }

    if (waterproof === 'Outdoor (Waterproof)') {
      if (selectedMounting === 'Double-sided tape') {
        setSelectedMounting('');
      }

      newMountingOptions = newMountingOptions.filter(
        option => option.mounting_option !== 'Double-sided tape'
      );
    }

    setMountingOptions(newMountingOptions);

    setMaxWidthOptions(() =>
      Array.from(
        {
          length: parseInt(maxWidthHeight) + 1,
        },
        (_, index) => {
          const val = 1 + index;
          return (
            <option key={index} value={val}>
              {val}"
            </option>
          );
        }
      )
    );
  }, [selectedThickness, selectedMounting, waterproof, maxWidthHeight]);

  function handleComments(e) {
    setComments(e.target.value);
  }

  const handleOnChangeThickness = e => {
    const target = e.target.value;
    const selected = thicknessOptions.filter(option => option.value === target);
    setSelectedThickness(() => selected[0]);

    if (parseInt(target) === 3) {
      if (
        selectedMounting === STUD_MOUNT ||
        selectedMounting === STUD_WITH_SPACER ||
        selectedMounting === 'Pad' ||
        selectedMounting === 'Pad - Combination All'
      ) {
        setSelectedMounting('');
        setStudLength('');
        setSpacerStandoffDistance('');
      }
    }
  };

  useEffect(() => {
    if (parseInt(selectedThickness?.value) > 3) {
      setMaxWidthHeight(42);
    } else {
      setMaxWidthHeight(23);
      if (height > 25) {
        setHeight('');
      }
      if (width > 25) {
        setWidth('');
      }
    }
  }, [selectedThickness]);

  const handleOnChangeSets = e => {
    setSets(e.target.value);
  };

  function updateSignage() {
    if (!signage.some(sign => sign.id === item.id)) return;
    const updatedSignage = signage.map((sign, index) => {
      if (sign.id === item.id) {
        return {
          ...sign,
          title: item.isLayered && !item.isCustom ? `Layer ${index + 1}` : item.title,
          comments,
          acrylicThickness: selectedThickness,
          mounting: selectedMounting,
          waterproof,
          width,
          height,
          usdPrice,
          cadPrice,
          files,
          fileNames,
          filePaths,
          fileUrls,
          sets,
          studLength,
          spacerStandoffDistance,
          usdSinglePrice,
          cadSinglePrice,
          metalFilm,
        };
      } else {
        return {
          title: item.isLayered && !item.isCustom ? `Layer ${index + 1}` : item.title,
          ...sign,
        };
      }
    });
    setSignage(() => updatedSignage);
  }

  useEffect(() => {
    updateSignage();
  }, [
    comments,
    selectedThickness,
    selectedMounting,
    waterproof,
    width,
    height,
    usdPrice,
    cadPrice,
    fileUrls,
    fileNames,
    files,
    sets,
    filePaths,
    studLength,
    spacerStandoffDistance,
    usdSinglePrice,
    cadSinglePrice,
    metalFilm,
  ]);

  useEffect(() => {
    const fetchLogoPricing = async () => {
      if (NovaQuote.tbd_pricing) return;

      try {
        const response = await fetch(`${NovaQuote.logo_pricing_api}${item.product}`);
        const data = await response.json();
        setLogoPricingObject(data);
      } catch (error) {
        console.error('Error fetching logo pricing:', error);
      }
    };

    fetchLogoPricing();
  }, [item.product]);

  function computePricing() {
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
      `${selectedThickness.value}mm`,
      logoPricingObject
    );

    if (logoPricing === undefined) {
      return {
        singlePrice: false,
        total: false,
      };
    }

    const logoPricingTable = convert_json(logoPricing);

    let tempTotal = 0;
    const baseLogoPricing = logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

    if (baseLogoPricing) {
      tempTotal += baseLogoPricing;
    }

    if (waterproof) {
      tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.1;
    }

    if (selectedMounting === STUD_WITH_SPACER) {
      const spacer = spacerPricing(tempTotal);
      tempTotal += spacer;
    }

    tempTotal *= acryMetalPricing;

    /** if Layered 3D */
    if (item.isLayered) {
      tempTotal *= ASSEMBLY_FEES;
    }

    const total = tempTotal * sets;

    return {
      singlePrice: tempTotal.toFixed(2) ?? 0,
      total: total ?? 0,
    };
  }

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
  }, [width, height, selectedThickness, waterproof, sets, selectedMounting, logoPricingObject]);

  const checkAndAddMissingFields = () => {
    const missingFields = [];

    if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
    if (!width) missingFields.push('Select Logo Width');
    if (!height) missingFields.push('Select Logo Height');
    if (!waterproof) missingFields.push('Select Environment');
    if (!selectedMounting) missingFields.push('Select Mounting');
    if (
      selectedMounting === STUD_WITH_SPACER ||
      selectedMounting === STUD_MOUNT ||
      selectedMounting === 'Pad' ||
      selectedMounting === 'Pad - Combination All'
    ) {
      if (!studLength) missingFields.push('Select Stud Length');
    }
    if (selectedMounting === STUD_WITH_SPACER) {
      if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
    }

    if (!sets) missingFields.push('Select Quantity');

    if (!hasUploadedFile) {
      if (!fileUrls || fileUrls.length === 0) missingFields.push('Upload a PDF/AI File');
    }

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
    height,
    selectedThickness,
    comments,
    selectedMounting,
    waterproof,
    fileUrls,
    fileNames,
    filePaths,
    files,
    sets,
    studLength,
    spacerStandoffDistance,
    hasUploadedFile,
    metalFilm,
  ]);

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
          title="Acrylic Thickness"
          value={selectedThickness?.value}
          onChange={handleOnChangeThickness}
          options={thicknessOptions.map(thickness => (
            <option
              key={thickness.value}
              value={thickness.value}
              defaultValue={thickness === selectedThickness}
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
              length: 43,
            },
            (_, index) => {
              const val = 1 + index;
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
              length: 24,
            },
            (_, index) => {
              const val = 1 + index;
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
          title="Environment"
          onChange={e => setWaterproof(e.target.value)}
          options={waterProofSelections.map(option => (
            <option
              key={option.option}
              value={option.option}
              defaultValue={option.option == waterproof}
            >
              {option.option}
            </option>
          ))}
          value={waterproof}
        />

        <Dropdown
          title="Mounting Options"
          onChange={handleOnChangeMount}
          options={mountingOptions.map(option => (
            <option
              key={option.mounting_option}
              value={option.mounting_option}
              defaultValue={option.mounting_option === selectedMounting}
            >
              {option.mounting_option}
            </option>
          ))}
          value={selectedMounting}
        />

        {(selectedMounting === STUD_WITH_SPACER ||
          selectedMounting === 'Pad' ||
          selectedMounting === 'Pad - Combination All' ||
          selectedMounting === STUD_MOUNT) && (
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
        {selectedMounting === STUD_WITH_SPACER && (
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

        {!item.hideQuantity && <NumberInput title="Quantity" value={sets} onChange={setSets} />}
      </div>

      {selectedMounting === STUD_WITH_SPACER && (
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
