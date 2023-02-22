const readURI = (event, setFile) => {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = function (ev) {
      setFile((prev) => ({ ...prev, fileURI: ev.target.result }));
    };
    reader.readAsDataURL(event.target.files[0]);
  }
};

export default readURI;
