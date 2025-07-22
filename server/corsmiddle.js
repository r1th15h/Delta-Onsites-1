import cors from 'cors'

const corsopt = {
    origin:"http://localhost:5173",
    }
const cor = cors(corsopt);
export default cor