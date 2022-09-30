import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Register from './Register';
import SignUp from './Register';
import SignIn from './Signin';
import Dropdown from './Dropdown';
import GoogleNotes from './notes/GoogleNotes';



const Home = () => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <Router>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/home' element={<Notes />} />
                    <Route path='/googleNotes' element={<GoogleNotes />} />
                    <Route path='/archive' element={<Notes />} />
                    <Route path='/delete' element={<Notes />} />
                    <Route path='/dropdown' element={<Dropdown />} />
                    <Route path='/Signin' element={<SignIn />} />
                    <Route path='/Register' element={<Register />} />
                </Routes>
            </Router>
        </Box>
    )
}

export default Home;