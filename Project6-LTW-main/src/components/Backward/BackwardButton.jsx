import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import './BackWardBtn.css'

const BackWardButton = ({path}) => {
    const history = useNavigate();

    const portalRoot = document.getElementById('top-bar');

    return portalRoot && createPortal(
        <div className="backward" onClick={() => history(path)}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="backward-icon"/>
        </div>,
        portalRoot
    );
}

export default BackWardButton
