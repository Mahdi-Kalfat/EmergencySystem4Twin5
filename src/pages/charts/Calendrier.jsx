import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Permet d'interagir avec le calendrier
import axios from "axios"; // Pour récupérer et envoyer des données à votre API

const Calendrier = () => {
  const [events, setEvents] = useState([]); // Événements à afficher dans le calendrier
  const [newEvent, setNewEvent] = useState({
    description: "",
    date: "",
    patientId: "",
  }); // Nouvel événement
  const [patients, setPatients] = useState([]); // Liste des patients
  const [loading, setLoading] = useState(true); // Loading state for patient data
  const [refresh, setRefresh] = useState(false); // State to trigger useEffect on event addition

  // Fetch the list of patients from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/patients")
      .then((response) => {
        setPatients(response.data); // On récupère la liste des patients
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des patients:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Fetch the list of rendezvous (appointments) from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/rendezvous/display")
      .then((response) => {
        console.log(response.data); // On récupère la liste des rdv

        // Map the response data to match FullCalendar's format
        const mappedEvents = response.data.map((rdv) => ({
          title: `${rdv.name} (${rdv.email})`, // Show the name and email in the event title
          start: new Date(rdv.date), // Set the start date
          description: rdv.description, // Store the description
          extendedProps: {
            name: rdv.name,
            email: rdv.email,
            description: rdv.description,
          },
        }));

        setEvents(mappedEvents); // Set the events to be displayed on the calendar
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des rdvs:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [refresh]); // Re-run the effect when 'refresh' is set to true

  // Fonction pour ajouter un nouvel événement
  const handleAddEvent = () => {
    if (!newEvent.description || !newEvent.date || !newEvent.patientId) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Envoi de l'événement au backend
    axios
      .post("http://localhost:3001/rendezvous/addRendezVous", {
        patientId: newEvent.patientId, // ID du patient
        description: newEvent.description,
        date: newEvent.date,
      })
      .then((response) => {
        // Directly update the calendar by appending the new event
        const newEventToAdd = {
          title: `${response.data.name} (${response.data.email})`, // Title with name and email
          start: new Date(response.data.date), // Set the start date
          description: response.data.description, // Store the description
          extendedProps: {
            name: response.data.name,
            email: response.data.email,
            description: response.data.description,
          },
        };

        setEvents((prevEvents) => [...prevEvents, newEventToAdd]); // Update the events state with the new event
        setNewEvent({ description: "", date: "", patientId: "" }); // Réinitialiser le formulaire

        // Trigger the refresh to re-fetch the events from the backend
        setRefresh((prevState) => !prevState); // Trigger the effect again to reload the events
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'événement:", error);
      });
  };

  return (
    <div className="calendar-container">
      <h2>Planification des Rendez-vous</h2>

      {/* Formulaire pour ajouter un événement */}
      <div>
        <input
          type="text"
          placeholder="Titre de l'événement"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />

        {/* Dropdown pour sélectionner un patient */}
        <select
          value={newEvent.patientId}
          onChange={(e) =>
            setNewEvent({ ...newEvent, patientId: e.target.value })
          }
        >
          <option value="">Sélectionner un patient</option>
          {loading ? (
            <option value="">Chargement...</option>
          ) : (
            patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))
          )}
        </select>

        <button onClick={handleAddEvent}>Ajouter l'événement</button>
      </div>

      {/* Affichage du calendrier */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Afficher le mois par défaut
        events={events} // Passer les événements à afficher
        editable={true} // Permet de modifier les événements
        droppable={true} // Permet de glisser-déposer les événements
        dateClick={(info) => {
          alert("Date cliquée: " + info.dateStr);
        }}
        eventClick={(info) => {
          const { name, email, description } = info.event.extendedProps;
          alert(
            `Événement cliqué: \n
            Nom: ${name} \n
            Email: ${email} \n
            Description: ${description}`
          );
        }}
      />
    </div>
  );
};

export default Calendrier;
