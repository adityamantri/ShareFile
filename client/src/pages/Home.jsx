import '../App.css';
import { useRef, useEffect, useState } from 'react';
import { getSignedUrl, uploadFile } from '../services/api';

const Home = () => {

    const [url, setUrl] = useState('');
    const [file, setFile] = useState('');
    
    const fileInputRef = useRef();
    
    useEffect(() => {
        const getData = async () => {
            const response = await getSignedUrl();
            setUrl(response.url);
        }
        getData();
    }, []);

    useEffect(() => {
        const getImage = async () => {
            if(file) {
                await uploadFile(url, file);
                setUrl(url.split('?')[0]);
            }
        }
        file && getImage();
    }, [file]);

    const onUploadClick = () => {
        fileInputRef.current.click();
    }

    return(
        <div className='container'>
            <h1>Share File</h1>
            <p>Convenient file sharing in three steps without registration..</p>
            
            <p>
                <span>1</span> 
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{display: 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                /> 
                <button onClick={() => onUploadClick()}>Select files to Upload</button>&nbsp;
                or drag-and-drop files into this browser window.</p>
            <p><span>2</span> The file uploads will begin. Wait until they complete.</p>
            <p><span>3</span> The files will be available at <a href={url}>{url.split('?')[0]}</a> which is a link you can share.</p>
            
            <p className='info'>The file uploads will cancel if you move away from this page before they complete. Uploaded files can be deleted manually at any time and will in any case be deleted automatically 6 days from now.</p>

            {file && <img src={url} alt="image" /> }
            
        </div>
    );
}

export default Home;
