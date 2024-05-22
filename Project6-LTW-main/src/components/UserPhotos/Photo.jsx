import { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import axios from "axios"
import { MyContext } from "../AppContext/contextProvider"
import {useNavigate, useParams } from "react-router-dom"
import Comment from "./Comment"
import moment from "moment";
import BackWardButton from "../Backward/BackwardButton"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

export default function Photo(){
    const cmtRef = useRef(null)
    const {user} = useContext(MyContext)
    const userPhoto = useParams();
    const [photo, setPhoto] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    const [showDialog, setShowDialog] = useState(false);
    const [reset, setReset] = useState(0)
    const history = useNavigate()

    useEffect(() => {
      const fetchPhotoDetail = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try{
          const res = await axios.get(`https://sqvfxf-8080.csb.app/api/photo/${userPhoto.photoId}`, {headers: headers})
          setPhoto(res.data)

        }catch(e){
          alert("Error to fetch photo detail!")
          console.error(e)
        }
      }

      fetchPhotoDetail()
    },[reset])

    const postComment = async () => {
        if(!cmtRef.current.value) return
        const headers = { 'Authorization': `Bearer ${token}` };
        console.log(cmtRef.current)
        const comment = {
          comment: cmtRef.current.value,
          userId: user._id
        }
        try{
          await axios.post(
            `https://sqvfxf-8080.csb.app/api/photo/commentsOfPhoto/${userPhoto.photoId}`,
            comment,
            {headers: headers}
          )
          setReset(reset + 1)
          cmtRef.current.value = ""
        }catch(e){
          console.log("Failed to create comment!", e)
        }
      }
    const deletePhoto = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      try{
        const res = await axios.delete(
          `https://sqvfxf-8080.csb.app/api/photo/delete/${userPhoto.photoId}`,
          {headers: headers}
        )
        console.log('Delete photo successfully!', res.data);
        history(`/photos/${photo.user_id}`)
      }catch(e){
        console.error("Erro to delete photo", e)
      }
    }

    return (
        <div className="photos-container">
            <BackWardButton path={`/photos/${photo.user_id}`} />
            {(photo.user_id === user._id) &&
              <button className="del-btn" onClick={() => setShowDialog(true)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            }
            <span className="photo-time">{formatDateTime(photo.date_time)}</span>
            <img src={photo.file_name} alt="" className="photo"/>
            <div className="photo-detail">
                <span style={{textAlign: "center", textTransform: "uppercase", fontStyle: "italic", margin:"0 5px"}}>Comments</span>
                {photo.comments && photo.comments.map(comment => (
                  <Comment comment={comment} key={comment._id}/>
                ))}
            </div>
            <div className="cmt-input">
              <input 
                type="text" 
                placeholder="Enter your comment" 
                ref={cmtRef}
              />
              <button onClick={postComment}>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </button>
            </div>
        </div>
    )
}
