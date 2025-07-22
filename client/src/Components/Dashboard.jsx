import { useEffect,useState } from 'react'
import axi from './axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [file,setfile] = useState(null);
    const [open,setopen] = useState(false);
    const [folder,setfolder] = useState("");
    const [parentid,setparentid] = useState(null);
    const [data,setdata] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const datafunc = async()=>{
            const getdata = await axi.get(`/getdata/${parentid}`);
            setdata(getdata.data);
            console.log(getdata.data);
        }
        datafunc(); 
    },[parentid])

    async function uploadfile(){
        try{
            const formdata = new FormData();
            formdata.append("parentid",parentid);
            formdata.append("fileupl",file);
            await axi.post('/upload/file',formdata);
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }
    }

    async function createfolder(){
        try{
            const res = await axi.post('/upload/folder',{name:folder,type:"folder",parentid:parentid});
            console.log("hello");
            setfolder("");
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }
    }

    async function movefolder(id){
        try{
            navigate(`/${id}`);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <div className='flex gap-10 justify-center items-center bg-[#ada8a8] p-4'>
            <div className='border border-green-700 p-2 py-3 cursor-pointer bg-[#5cbddd] transition hover:opacity-90 rounded-lg' onClick={()=>setopen(!open)}>Create Folder</div>
            {open && 
            <div>
                <input type="text" name="foldernm" id="foldernm" autoFocus className='border border-black p-1 w-50 mr-5' value={folder} onChange={(e)=>setfolder(e.target.value)} />
                <button onClick={createfolder} className='border border-black bg-[#5cbddd] p-2 px-3 cursor-pointer'>Create</button>
            </div>}
            <label className='border border-green-700 p-2 rounded-lg py-3 cursor-pointer bg-[#5cbddd]  transition hover:opacity-90'>Select File
            <input type="file" name="fileupl" id="fileupl" className='hidden' onChange={(e)=>{setfile(e.target.files[0])}} />
            </label>
            <button onClick={uploadfile} className='border border-green-700 rounded-lg bg-[#5cbddd] p-2 py-3 cursor-pointer transition hover:opacity-90'>Upload file</button>
        </div>
        <div className='flex gap-6 flex-wrap mx-40 mt-16'>
        {data && data.map((ele,ind) => {
            return(
                <div key={ele._id}>
                    {ele.type=="file" && 
                    <div className='flex flex-col items-center'>
                        <div className='cursor-pointer text-7xl'><a href={`http://localhost:5000/uploads/${ele.name}`} target='_blank'>📄</a></div>
                        <div className='w-10'>{ele.name.slice(0,7)+'...'}</div>
                    </div>}  
                    {ele.type=="folder" && 
                    <div className='flex flex-col items-center'>
                        <div onClick={()=>movefolder(ele._id)} className='cursor-pointer text-7xl'>📂</div>
                        <div>{ele.name}</div>
                    </div>}  
                </div>
            )
        })}
        {data.length==0 && <div className='text-center text-3xl'>No Items...</div>}
        </div>
    </div>
  )
}
