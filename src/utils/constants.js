export const CRITICIDAD = ["Importante", "Esencial", "Deseable", "Opcional"];

export const ACTIVITIES_TYPES = [
  "Documento",
  "Presentación",
  "Creación de Historias",
  "Edición de Historias",
  "Asignar Historias a Sprint",
  "Sprint",
];

export const RESPONSABLES_SAMPLE = [
  "Pedro Godoy",
  "Gabriel Valenzuela",
  "Cecilia Reyes",
  "Luis Hevia",
  "Liubov Dombrovskaia",
];

export const ROLES = [
  "Administrador",
  "Profesor",
  "Ayudante",
  "Juez",
  "Alumno",
];

export const DELIVERABLE_STATE = {
  pending: { text: "Pendiente de envío", color: "is-warning" },
  pending_delayed: { text: "Pendiente de envío", color: "is-warning" },
  closed: { text: "No enviado", color: "is-danger" },
  done: { text: "Sin Evaluar", color: "is-primary" },
  evaluated: { text: "Nota", color: "is-success" },
};
