import { useEffect, useRef, useState } from "react"
import './Camera.css';
import data from'./answers.json'
function Camera() {
    const videoRef = useRef()
    const photoRef = useRef()
    const [imageData, setImageData] = useState(null)
    const [prediction, setPrediction] = useState(null)

    const classes = ['Bean', 'Bitter Melon', 'Bottle Gourd', 'Eggplant', 'Broccoli', 'Cabbage', 'Bell Pepper', 'Carrot', 'Cauliflower', 'Cucumber', 'Papaya', 'Potato', 'Pumpkin', 'White Radish', 'Tomato']
    const [answerPosition, setAnswerPosition] = useState(0);

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        let response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        setPrediction(data.prediction)
    }
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 607, height: 1080 }
        }).then(stream => {
            let video = videoRef.current
            video.srcObject = stream
            video.onloadedmetadata = () => {
                video.play()
            }


        }).catch(err => {
            console.log(err)
        })
    }
    const moveDownwards = () => {
        setAnswerPosition(answerPosition + 800);
    }

    const takePhoto = async () => {
        let video = videoRef.current
        let photo = photoRef.current
        photo.width = 100
        photo.height = 100

        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0, 0, 100, 100)

        setImageData(photo.toDataURL('image/jpeg'))
        setAnswerPosition(answerPosition - 800);
    }
    useEffect(() => {
        if (imageData) {
            fetch(imageData)
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File([blob], imageData, { type: 'image/jpeg' });
                    console.log(file);
                    uploadImage(file);
                });
        }
        getVideo()
    }, [videoRef, imageData])
    return (
        <div className="camera">

            <div className="wrapper">
                <div className="camdisplay" >
                    <img src="/Logo.png" style={{ position: 'absolute', top: 20, left: 20, width: '50%' }} />
                    <video ref={videoRef}></video>
                    
                    <div className="bottom" />
                    <div className="cambutton" onClick={takePhoto} >
                        <img src="/mdi_camera.png" />
                    </div>

                </div>
                <canvas ref={photoRef} style={{ display: 'none' }} ></canvas>
                <div className="answer" style={{ transform: `translateY(${answerPosition}px)` }}>
                    <div className="barswrapper" onClick={moveDownwards}>
                        <div className="bar" />
                        <div className="bar" />
                    </div>
                    {prediction ? <img src={"/" + classes[prediction] + ".jpg"} /> : <></>}
                    {prediction ? <div className="answertext">
                        <h1>{classes[prediction]}</h1>
                        <p>{data[prediction].desc}</p>
                        <h3 style={{marginTop:30}}>Recipes we've curated for you:</h3>
                        {data[prediction].recipes.map((recipe, index)=>(
                            <a key={index} href={recipe}>{data[prediction].titles[index]}</a>
                        ))}
                    </div> :
                        <div className="answertext">
                            <h1>Something went wrong :3</h1>

                        </div>
                    }

                </div>
            </div>

        </div>
    )
}
export default Camera