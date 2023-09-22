import React, { useState } from "react";
import { delay } from "../../utils/functions";
import { Input, Form } from "../Forms";
import { createUser } from "../../services/user";
import { SHA3 } from "crypto-js";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { addUser } from "../../store/slices/userSlice";

const Register = ({ modalState, closeModal }) => {
  const [formState, setForm] = useState({
    correo: "",
    nombre: "",
    contraseña: "",
    contraseña_repeat: "",
  });
  const [showMessage, setMessage] = useState(false);
  const dispatch = useDispatch();
  const form = useForm(formState, setForm);

  const createCallback = async (user) => {
    setMessage(true);
    await delay(3000);
    closeModal();
    dispatch(addUser(user));
  };

  const [fetchRegister, isLoading] = useFetch(createUser, createCallback, true);

  const clearForm = () => {
    const newState = Object.keys(formState).reduce((prev, acc) => {
      prev[acc] = "";
      return prev;
    }, {});
    setForm(newState);
  };

  const handleCreate = async () => {
    if (form.validationState) {
      await fetchRegister({
        email: formState.correo.toLowerCase(),
        name: formState.nombre,
        password: SHA3(formState.contraseña).toString(),
      });
    } else {
      form.setShowError(true);
    }
  };

  const handleCancel = () => {
    form.setShowError(false);
    clearForm();
    closeModal();
  };

  return (
    <section className={`modal ${modalState ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal} />
      {showMessage ? (
        <section className="notification is-success is-light">
          <p className="is-size-4">
            <strong>¡Registro Exitoso!</strong>
          </p>
          <p className="is-size-6">En breve serás redireccionado</p>
        </section>
      ) : (
        <article className="modal-card">
          <header className="modal-card-head">
            <p className="has-text-weight-bold is-size-4">Crear Usuario</p>
          </header>

          <Form className="modal-card-body" form={form}>
            <Input
              name="correo"
              label="Correo"
              type="email"
              placeholder="Ingrese su correo"
              validations={["required", "email"]}
            />

            <Input
              name="nombre"
              label="Nombre"
              type="text"
              placeholder="Ingrese su nombre"
              validations={["required"]}
            />

            <Input
              name="contraseña"
              label="Contraseña"
              type="password"
              placeholder="********"
              validations={["required", "passLen"]}
            />

            <Input
              name="contraseña_repeat"
              label="Repetir Contraseña"
              type="password"
              placeholder="********"
              validations={["required"]}
              customValidations={[
                (value) => {
                  if (
                    formState.contraseña !== "" &&
                    formState.contraseña === value
                  ) {
                    return null;
                  }
                  return "Las contraseñas deben ser iguales";
                },
              ]}
              onKeyDown={handleCreate}
            />
          </Form>

          <footer className="modal-card-foot">
            <button
              className={`button is-success ${isLoading && "is-loading"}`}
              onClick={handleCreate}
            >
              Registrar
            </button>

            <button className="button is-danger" onClick={handleCancel}>
              Cancelar
            </button>
          </footer>
        </article>
      )}
    </section>
  );
};

export default Register;
