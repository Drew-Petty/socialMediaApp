import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PictureForm from './PictureForm'
import PictureItem from './PictureItem'
import { getPictures } from '../../actions/pictures'


const Pictures = ({getPictures, picture:{pictures, loading}}) => {

    useEffect(()=>{
        getPictures()
    },[getPictures])

    return loading ? <Spinner/> : (
        <Fragment>
            <h1 className="large text-primary">Pictures</h1>
            <p className="lead"><i className="fas fa-user"></i> Add or view pictures</p>
            <PictureForm/>
            <div className="posts">
                {pictures.map(picture=>(
                    <PictureItem key={picture.id} picture={picture}/>
                    ))}
            </div>
        </Fragment>
    )}

Pictures.propTypes = {
    picture:PropTypes.object.isRequired,
    getPictures:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    picture:state.picture
})
export default connect(mapStateToProps,{ getPictures})(Pictures)
