export const CRITICIDAD = ["Importante", "Esencial", "Deseable", "Opcional"];

export const STORY_STATES = [
  "Por Hacer",
  "En Progreso",
  "Testing",
  "Terminado",
];

export const SPRINTS = ["MVP", "Sprint 1", "Sprint 2", "Sprint 3"];

export const ACTIVITIES_TYPES = [
  {
    value: "document",
    text: "Documento",
  },
  {
    value: "presentation",
    text: "Presentación",
  },
  {
    value: "storyCreation",
    text: "Creación de Historias",
  },
  {
    value: "storyEdition",
    text: "Edición de Historias",
  },
  {
    value: "storyAssign",
    text: "Asignar Historias a Sprint",
  },
  {
    value: "sprint",
    text: "Sprint",
  },
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
  done: { text: "Enviado", color: "is-primary" },
  evaluated: { text: "Nota", color: "is-success" },
};

export const CAMPUS = [
  { text: "Ambos", value: "all" },
  { text: "San Joaquín", value: "SJ" },
  { text: "Casa Central", value: "CC" },
];
