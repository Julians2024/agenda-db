import React, { useState } from 'react';
import axios from 'axios';

const ModalDialog = ({ onClose }) => {
    const [eventName, setEventName] = useState('');
    const [color, setColor] = useState('');

    const handleSaveEvent = async () => {
        const event = {
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: new Date().getHours(),
            eventName,
            color
        };

        try {
            const response = await axios.post('/api/addEvent', event);
            console.log(response.data.message); // Mensaje de confirmación del backend
            onClose(); // Cierra el cuadro de diálogo después de guardar
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Evento</h2>
                <label>Nombre del Evento:</label>
                <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <label>Color (Tipo de Turno):</label>
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="azul">Azul</option>
                    <option value="verde">Verde</option>
                    <option value="rojo">Rojo</option>
                    <option value="amarillo">Amarillo</option>
                    <option value="otro">Otro</option>
                </select>
                <button onClick={handleSaveEvent}>Guardar Evento</button>
            </div>
        </div>
    );
};

export default ModalDialog;


