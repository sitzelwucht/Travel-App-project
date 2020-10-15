

export const getImage = async () => {
    const place = document.getElementById('destination').value;
    const res = await Client.getAPIkey();
    const imgData = await fetch(`https://pixabay.com/api/?key=${res.pixabayKey}&q=${place}&image_type=photo`);
    const img = await imgData.json();

    document.getElementById('img-desktop').src = img.hits[0].webformatURL;
    document.getElementById('img-mobile').src = img.hits[0].webformatURL;
}
