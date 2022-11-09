import { useDropzone } from 'react-dropzone';
import { useMemo, useState, useCallback, useEffect, useContext } from 'react';
import api from '../../services/api';
import LoginContext from '../../context/LoginContext';
import './UploadFile.css'
import { FiCheck } from "react-icons/fi";


const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px',
    width: '40vw',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#a5a5a5',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#a5a5a5',
    transition: 'border .3s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
export default function UploadFile(props) {
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const context = useContext(LoginContext);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles[0] && acceptedFiles[0].name.includes('.txt')) {

            var formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            formData.append('user_id', context.userId);
            formData.append('publico', isPublic);

            api.post(`/cadastro/grafo`, formData)
                .then((response) => {
                    setIsUploaded(true);
                    props.getData();
                })
                .catch((error) => {
                    alert(error.response.data.detail);
                })
        }
    }, [isPublic]);

    const {
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop, multiple: false,
        accept: {
            'text/plain': ['.txt'],
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <p style={{ fontSize: '12px', margin: '10px', textAlign: 'center', color: 'red' }}>Arquivo em formato não aceito, favor fornecer um arquivo .txt</p>
    ));

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                {file.name}
            </div>
        </div>
    ));

    return (
        <>
            {isUploaded ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCheck className='check-icon'></FiCheck>  <p className='sucess-message'>Grafo Cadastrado Com Sucesso</p></div>
                :
                <section>
                    <div className="graphUpload-visibility_container">
                        <p>Visibilidade do grafo</p>
                        <div className='graphUpload-radios_container'>
                            <input type="radio" value="Público" name="ispublic"
                                checked={isPublic === true}
                                onChange={() => { setIsPublic(true); }} /> Público
                            <input type="radio" value="Privado" name="ispublic" onChange={() => { setIsPublic(false)}} /> Privado
                        </div>
                    </div>

                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <div>Arraste e solte seu arquivo aqui</div>
                    </div>
                    <aside>
                        <ul>{fileRejectionItems}</ul>
                    </aside>
                </section>
            }
        </>
    );
}