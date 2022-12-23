import React from 'react';

enum VALIDATE_TYPE {
	REQUIRED = 'REQUIRED',
	EMAIL = 'EMAIL',
	RUT = 'RUT',
	MIN_NUMBER = 'MIN_NUMBER',
}

type InputType = string | number | boolean;
type IsValidateType = boolean | undefined | null;
type MessageType = string | undefined | null;

type ValidationFormOptions = {
	isRequired: boolean;
	isEmail: boolean;
	isRut: boolean;
	minNumber: number;
};

type ValidationFormMessage = {
	isRequired: string;
	isEmail: string;
	isRut: string;
	minNumber: string;
};

type ValidationForm = {
	[inputName: string]: ValidationFormObject;
};

type ValidationFormObject = {
	data: InputType;
	message?: Partial<ValidationFormMessage>;
	options?: Partial<ValidationFormOptions>;
};

export type ValidationFormError = {
	[inputName: string]: ValidationFormErrorObject[];
};

type ValidationFormErrorObject = {
	data: InputType;
	message: string;
	validateType: keyof typeof VALIDATE_TYPE;
};

type UseValidationForm = {
	validate: () => boolean;
	isError: boolean;
	errors: ValidationFormError;
};

const defaultMessages: ValidationFormMessage = {
	isRequired: 'Campo requerido',
	isEmail: 'Email invalido',
	isRut: 'Rut invalido',
	minNumber: 'Numero minimo no alcanzado',
};

const copyPreviousError = (
	error: ValidationFormError,
	fieldName: string,
): ValidationFormError => {
	const newError = { ...error };

	if (!newError[fieldName]) {
		newError[fieldName] = [];
	}
	return newError;
};

/**
 * @param {ValidationForm} formData form data use to validate.
 * @returns {UseValidationForm} validate() | errors | isError.
 */
const useValidationForm = (formData: ValidationForm): UseValidationForm => {
	const [errors, setErrors] = React.useState<ValidationFormError>({});
	const isError = React.useMemo(
		() => (Object.keys(errors).length > 0 ? true : false),
		[errors],
	);

	React.useEffect(() => {
		return;
	}, [formData]);

	const pushErrors = (
		data: InputType,
		fieldName: string,
		message: string,
		validateType: VALIDATE_TYPE,
	) => {
		setErrors((prevErrors) => {
			const newErrors = copyPreviousError(prevErrors, fieldName);
			newErrors[fieldName].push({
				data,
				validateType,
				message,
			});
			return newErrors;
		});
	};

	/**
	 * @returns {boolean} validates form data and push errors.
	 */
	const validate = (): boolean => {
		let error = false;
		setErrors({});
		for (const fieldName of Object.keys(formData)) {
			console.log(formData[fieldName]);

			if (
				validateRequire(
					formData[fieldName].data,
					formData[fieldName].options?.isRequired,
					formData[fieldName].message?.isRequired,
					fieldName,
				)
			) {
				error = true;
			}
			if (
				validateEmail(
					formData[fieldName].data,
					formData[fieldName].options?.isEmail,
					formData[fieldName].message?.isEmail,
					fieldName,
				)
			) {
				error = true;
			}
			if (
				validateRut(
					formData[fieldName].data,
					formData[fieldName].options?.isRut,
					formData[fieldName].message?.isRut,
					fieldName,
				)
			) {
				error = true;
			}
			if (
				validateMinNumber(
					formData[fieldName].data,
					formData[fieldName].options?.minNumber,
					formData[fieldName].message?.minNumber,
					fieldName,
				)
			) {
				error = true;
			}
		}

		return error;
	};

	/**
	 * @param {string | number | boolean} input generic value to be tested.
	 * @param {string} fieldName string - name of the field.
	 * @param {boolean} isValidate boolean - false to skip validation.
	 * @param {boolean} message string - custom error message;
	 * @returns {boolean} Result of validation | true = Failed
	 */
	const validateRequire = (
		input: InputType,
		isValidate: IsValidateType,
		message: MessageType,
		fieldName: string,
	): boolean => {
		if (!isValidate) {
			return false;
		}

		const inputType = typeof input;
		switch (inputType) {
			case 'string':
				if (input !== '' && input !== undefined) {
					return false;
				}
				break;
		}

		if (input !== undefined && inputType !== 'string') {
			return false;
		}

		pushErrors(
			input,
			fieldName,
			message ? message : defaultMessages.isRequired,
			VALIDATE_TYPE.REQUIRED,
		);
		return true;
	};

	/**
	 * @param {string | number | boolean} input generic value to be tested.
	 * @param {string} fieldName string - name of the field.
	 * @param {boolean} isValidate boolean - false to skip validation.
	 * @param {boolean} message string - custom error message;
	 * @returns {boolean} Result of validation | true = Failed
	 */
	const validateEmail = (
		input: InputType,
		isValidate: IsValidateType,
		message: MessageType,
		fieldName: string,
	): boolean => {
		if (!isValidate) {
			return false;
		}
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (regex.test(String(input).toLowerCase())) {
			return false;
		}

		pushErrors(
			input,
			fieldName,
			message ? message : defaultMessages.isEmail,
			VALIDATE_TYPE.EMAIL,
		);
		return true;
	};

	/**
	 * @param {string | number | boolean} input generic value to be tested.
	 * @param {string} fieldName string - name of the field.
	 * @param {boolean} isValidate boolean - false to skip validation.
	 * @param {boolean} message string - custom error message;
	 * @returns {boolean} Result of validation | true = Failed
	 */
	const validateRut = (
		input: InputType,
		isValidate: IsValidateType,
		message: MessageType,
		fieldName: string,
	): boolean => {
		if (!isValidate) {
			return false;
		}
		const inputType = typeof input;
		if (inputType === 'boolean') {
			return true;
		}
		const moduleNumber = 11;
		let rut = input.toString();
		let sum = 0;
		let multiply = 2;
		rut = rut.replaceAll('.', '');
		rut = rut.replaceAll('-', '');
		const verifyDigit = rut.charAt(rut.length - 1);
		rut = rut.substring(0, rut.length - 1);
		for (let i = rut.length - 1; i >= 0; i--) {
			sum = sum + parseInt(rut[i]) * multiply;
			if (multiply >= 7) {
				multiply = 2;
			} else {
				multiply++;
			}
		}

		const division = Math.trunc(sum / moduleNumber);
		const multiplication = division * moduleNumber;
		const substraction = sum - multiplication;
		const result = moduleNumber - substraction;

		if (result === 10 && verifyDigit === 'k') {
			return false;
		}
		if (result === 11 && verifyDigit === '0') {
			return false;
		}
		if (result.toString() === verifyDigit) {
			return false;
		}

		pushErrors(
			input,
			fieldName,
			message ? message : defaultMessages.isRut,
			VALIDATE_TYPE.RUT,
		);
		return true;
	};

	/**
	 * @param {string | number | boolean} input generic value to be tested.
	 * @param {string} fieldName string - name of the field.
	 * @param {boolean} isValidate boolean - false to skip validation.
	 * @param {boolean} message string - custom error message;
	 * @returns {boolean} Result of validation | true = Failed
	 */
	const validateMinNumber = (
		input: InputType,
		minNumber: number | undefined | null,
		message: MessageType,
		fieldName: string,
	): boolean => {
		let value;
		if (minNumber === undefined || minNumber === null) {
			return false;
		}
		try {
			switch (typeof input) {
				case 'number':
					value = input as number;
					break;
				case 'string':
					value = parseInt(input as string);
					break;
				default:
					throw new Error('Value has not providen of a valid number');
			}
			if (value === null || Number.isNaN(value) || value === undefined) {
				throw new Error('Value has not providen of a valid number');
			}
			if (value >= minNumber) {
				return false;
			} else {
				throw new Error('Value has not providen of a valid number');
			}
		} catch (e) {
			pushErrors(
				input,
				fieldName,
				message ? message : defaultMessages.minNumber,
				VALIDATE_TYPE.MIN_NUMBER,
			);
			return true;
		}
	};

	return { validate, isError, errors };
};

export default useValidationForm;
