import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/MyCalendar.css'; // Archivo CSS para estilos personalizados
import MonthCellWrapper from './MonthCellWrapper';
import DayTimeSlotWrapper from './DayTimeSlotWrapper';
import ModalDialog from './ModalDialog';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [view, setView] = useState('month'); // Estado para controlar la vista del calendario
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null);
    const [eventInput, setEventInput] = useState(''); // Estado para almacenar el evento ingresado
    const [eventType, setEventType] = useState(''); // Estado para almacenar el tipo de evento

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setView('day'); // Cambia la vista a 'day' cuando se selecciona un día
    };

    const handleNavigate = (date, view) => {
        setSelectedDate(date);
        setView(view);
    };

    const openModal = (hour) => {
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventInput('');
        setEventType('');
    };

    const handleSaveEvent = () => {
        // Aquí puedes manejar la lógica para guardar el evento
        console.log(`Evento guardado a las ${selectedHour}:00 - ${eventInput} (${eventType})`);
        closeModal();
    };

    return (
        <div>
            <h1>Calendario de Agenda</h1>
            <div style={{ height: 500 }}>
                <Calendar
                    localizer={localizer}
                    events={events} // Pasamos las propiedades de los eventos
                    views={['month', 'day']}
                    onSelectSlot={handleSelectSlot}
                    onView={(view) => setView(view)}
                    view={view}
                    defaultDate={new Date()}
                    selectable={true}
                    components={{
                        month: {
                            dateCellWrapper: (props) => (
                                // Personalización del área de clic para días en la vista mensual
                                <MonthCellWrapper {...props} setSelectedDate={setSelectedDate} setView={setView} />
                            ),
                        },
                        day: {
                            timeGutterHeader: () => null, // Oculta la columna de horas
                            timeSlotWrapper: (props) => (
                                // Componente para la columna B clickeable en la vista diaria
                                <DayTimeSlotWrapper {...props} openModal={openModal} />
                            ),
                        },
                    }}
                />
            </div>

            <ModalDialog
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedHour={selectedHour}
                eventInput={eventInput}
                setEventInput={setEventInput}
                eventType={eventType}
                setEventType={setEventType}
                handleSaveEvent={handleSaveEvent}
            />
        </div>
    );
};

MyCalendar.propTypes = {
    events: PropTypes.array.isRequired,
};

export default MyCalendar;


