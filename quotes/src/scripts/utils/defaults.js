export const INDOOR_NOT_WATERPROOF = 'Indoor';
export const GLOSS_FINISH = 'Gloss';
export const CLEAR_COLOR = 'Clear';
export const FROSTED_CLEAR_COLOR = 'Frosted Clear';
export const STUD_WITH_SPACER = 'Stud with spacer';
export const STUD_MOUNT = 'Stud Mount';
export const EXCHANGE_RATE = 1.35;
export const ASSEMBLY_FEES = 1.1;
export const M4_STUD_WITH_SPACER = 'M4 Stud with Spacer';
export const LIGHTING_INDOOR =
	'Low Voltage LED Driver, 6ft open wires, 1:1 blueprint';

export const shippingRates = (total, currency) => {
	let standard, expedite;
	let flatRate = currency === 'USD' ? 14.75 : 14.75 * EXCHANGE_RATE;
	let expediateRate = currency === 'USD' ? 29.5 : 29.5 * EXCHANGE_RATE;
	if (total < 800) {
		standard = total * 0.09 > flatRate ? total * 0.09 : flatRate;
		expedite = total * 0.175 > expediateRate ? total * 0.175 : expediateRate;
	} else {
		standard = total * 0.08 > flatRate ? total * 0.08 : flatRate;
		expedite = total * 0.155 > expediateRate ? total * 0.155 : expediateRate;
	}
	return {
		standard,
		expedite,
	};
};
