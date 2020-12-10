import React, { useState } from "react";
import qrcodeParser from "qrcode-parser";
import './style.css';

function ScannerPNG() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(" ");
  const style = {
    width: "50%",
    margin: "2rem auto",
  };

  function handleChange(e) {
    setData(null);
    setFile(null);
    if (e.target.files[0]) {
      const fileName = e.target.files[0].name;
      const format = fileName.slice(fileName.indexOf(".")).toLowerCase();
      if (format === ".png") {
        setFile(URL.createObjectURL(e.target.files[0]));
        qrcodeParser(URL.createObjectURL(e.target.files[0])).then((res) => {
          setData("Данные с чека: " + res.data);
        });
      } else {
        setData("Неправильный формат файла");
      }
    }
  }

  return (
    <>
      <div className="content">
        <h1> Выберите фото в формате png </h1>
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        {file && <img style={style} src={file} alt="qr_photo"></img>}
        {data ? (
          <>
            <h2>{data}</h2>
          </>
        ) : (
          <>
            <h2> Не удалось прочить код</h2>
          </>
        )}
      </div>
    </>
  );
}
export default ScannerPNG;
