"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [picked, setPicked] = useState();
  

  const imageInput = useRef();
  function handlePickClick() {
    imageInput.current.click();
  }
  function handleImagechange() {
    const file = imageInput.current.files[0];
    if(!file) {
        setPicked(null)
        return;
    }
    setPicked(URL.createObjectURL(file));
    console.log(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!picked && <p>Please pick an image</p>}
            {picked && <Image src={picked} alt="Picked Image" fill />
            }
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept=".jpg,.png,.jpeg"
          ref={imageInput}
          onChange={handleImagechange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
