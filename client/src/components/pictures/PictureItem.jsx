import React from 'react'
import PropTypes from 'prop-types'

const PictureItem = ({ picture:{path}}) => {
    return (
        <div>
            <img src={path} alt="" />
        </div>
    )
}

PictureItem.propTypes = {
    picture:PropTypes.object.isRequired,
}

export default PictureItem

