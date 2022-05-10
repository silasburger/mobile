export const URL = 'http://localhost:5000';

export const VALIDATION_CONSTRAINTS = {
    beginning: [/^https?:\/\/\S+/, 'Must begin with http[s]://'],
    contentType: [/^image\//, 'Not pointing to an image']
};

export const FORM_INITIAL_STATE = {make: '', model: '', year: '2015', email: '', price: '5000', url: 'https://', description: ''}

export const MAKES = ['BMW', 'Peugeot', 'Fiat', 'Toyota', 'Kia', 'Chevrolet'];
