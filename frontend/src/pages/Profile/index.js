import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from "../../assets/logo.png";
import { FiArrowLeft, FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'; 
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncients] = useState([]);

    const history = useHistory('');
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profile', {
            headers : {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncients(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId, 
                }
            });

            setIncients(incidents.filter(incidents => incidents.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente');
        }

      
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className= "profile-container">
            
            <header>
            <img src = {Logo} alt="SaveThePeople"></img>
            <span>Bem vinda, {ongName}</span>
            <Link className="button"to="/incidents/new">Cadastrar novo Caso</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#7159c1"/>
            </button>    
            </header>
            
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO: </strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÂO: </strong>
                    <p>{incident.description}</p>

                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-BR', { style : 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)} > <FiTrash2 size={20} color="#a8a8b3"/></button>
                </li>
                ))}
            </ul>
          
        </div>   
    );
}