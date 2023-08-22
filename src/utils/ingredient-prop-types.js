import PropTypes from 'prop-types';

const getIngredientPropTypes = () => {
    return {
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
        __v: PropTypes.number,
        _id: PropTypes.string,
        order: PropTypes.object,
        success: PropTypes.bool,
    };
};

export default getIngredientPropTypes;