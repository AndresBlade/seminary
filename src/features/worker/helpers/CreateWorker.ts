
async function CreateWorker({data, imageFile}:{data:object,imageFile:File}): Promise<Response> {
    const formData = new FormData();
    formData.append('image',imageFile);
    const response = await fetch('http://127.0.0.1:3000/Diocese/',{
        method:'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        body:JSON.stringify({
            data:data,
            img: formData
        })
            
    });
    console.log(response);

    return response;

}
export {CreateWorker};