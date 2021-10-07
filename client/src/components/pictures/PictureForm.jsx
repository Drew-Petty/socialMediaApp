import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addPicture } from '../../actions/pictures'

const PictureForm = ({ addPicture }) => {

    const [file, setFile]= useState('')
    // const [image, setImage] = useState(null)
    // const [errors, setErrors] = useState({})
    // const imageRef = useRef()


    const onSubmitHandler= e =>{
        console.log('onsubmit handler')
        e.preventDefault()
        addPicture(file)
        e.target.reset()
    }
    const onChangeFile = e =>{
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader()
            reader.onload = e =>{
                const img = new Image()
                img.onload =()=>{
                    // setImage(e.target.result)
                }
                img.onerror =()=>{
                    // setErrors({...errors,notImage:"A file must be an image"})
                    return false
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
        }
        setFile(e.target.files[0]);
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Add Picture</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmitHandler}>
                <input className="btn btn-light" type="file" name="file"  onChange={onChangeFile}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    {/* {image?<img className="imagePreview" ref={imageRef} src={image} alt="" />:''} */}

            </form>
            
        </div>
    )
}

PictureForm.propTypes = {
    addPicture:PropTypes.func.isRequired,
}

export default connect(null,{ addPicture})(PictureForm)
