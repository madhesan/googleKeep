import { useRef } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { useState } from "react";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`
const note = {
    id: '',
    title: '',
    text: ''
}

const Form = () => {
    const User = localStorage.getItem("token");
    const GoogleId = localStorage.getItem("tokenId");
    const [showTextField, setShowTextField] = useState(false);
    const [erroe, setError] = useState(false);
    const [addNote, setAddNote] = useState({
        ...note, id: uuid(),
        text: "",
        title: "",
        user1: User,
        googleuser: GoogleId

    });

    const handleChange = ({ currentTarget: input }) => {
        setAddNote({ ...addNote, [input.name]: input.value });
    };

    const containerRef = useRef();

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    const handleSubmit = async (e) => {
        window.location.reload();
        e.preventDefault();
        try {
            const url = "http://localhost:8081/api/users/add";
            const { addNote: res } = await axios.post(url, addNote);
            console.log(res.addNote);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.addNote.message);
            }
        }

    };


    return (

        <ClickAwayListener>
            <Container ref={containerRef} style={{ marginLeft: "400px", marginTop: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <input
                        style={{
                            display: " flex",
                            flexDirection: "column",
                            margin: "auto",
                            boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                            borderColor: "#e0e0e0",
                            width: "550px",
                            borderRadius: "8px",
                            minHeight: "30px",
                            padding: "10px 15px"
                        }}

                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => onTextChange(e)}
                        name='title'
                        value={addNote.title}
                    />

                    <input
                        style={{
                            display: " flex",
                            flexDirection: "column",
                            margin: "auto",
                            boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                            borderColor: "#e0e0e0",
                            width: "500px",
                            borderRadius: "8px",
                            minHeight: "30px",
                            marginTop: "10px",
                            padding: "10px 15px"
                        }}
                        placeholder="Take a note..."
                        multiline
                        maxRows={Infinity}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        onClick={onTextAreaClick}
                        onChange={(e) => onTextChange(e)}
                        name='text'
                        onChange1={handleChange}
                        value={addNote.text}
                    />
                    <button style={{
                        marginLeft: "500px",
                        marginTop: "10px",
                        backgroundColor: "white",
                        border: "none",
                        shadow: "2px 2px",
                    }} ><Fab color="primary" aria-label="add" >
                            <AddIcon />
                        </Fab></button>
                </form>
            </Container>
        </ClickAwayListener>
    )
}

export default Form;