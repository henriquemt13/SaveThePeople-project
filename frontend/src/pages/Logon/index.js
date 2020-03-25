import React, { useState} from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom'; 
import Logo from "../../assets/logo.png";
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
            
        }catch(err){
            alert('Falha no Login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e =>setId(e.target.value)} />
                    <button className="button" type="submit"> Entrar</button>
                    <Link className="back-link" to="/register"> <FiLogIn size={16} color="#7159c1" /> Não tenho Cadastro</Link>
                </form>
            </section>
            <img src={Logo} alt="SaveThePeople" />
        </div>
    );
}