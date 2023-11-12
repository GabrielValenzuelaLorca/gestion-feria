import React, { useState } from "react";
import { delay } from "../../utils/functions";
import { Input, Form, Select } from "../Forms";
import { createUser } from "../../services/user";
import { SHA3 } from "crypto-js";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { addUser } from "../../store/slices/userSlice";
import { CAMPUS } from "../../utils/constants";

const defaultState = {
  email: "",
  name: "",
  lastName: "",
  campus: "",
  password: "",
  passwordRepeat: "",
};

const Register = ({ modalState, closeModal }) => {
  const [formState, setForm] = useState(defaultState);
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
    setForm(defaultState);
  };

  const handleCreate = async () => {
    if (form.validationState) {
      await fetchRegister({
        email: formState.email.toLowerCase(),
        name: formState.name,
        lastName: formState.lastName,
        campus: formState.campus,
        password: SHA3(formState.password).toString(),
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
              name="email"
              label="Correo"
              type="email"
              placeholder="Ingrese su correo"
              validations={["required", "email"]}
            />

            <Input
              name="name"
              label="Nombre"
              type="text"
              placeholder="Ingrese su nombre"
              validations={["required"]}
            />

            <Input
              name="lastName"
              label="Apellido"
              type="text"
              placeholder="Ingrese su apellido"
              validations={["required"]}
            />

            <Select
              name="campus"
              label="Campus (donde rendirá el curso)"
              options={CAMPUS}
              validations={["required"]}
            />

            <Input
              name="password"
              label="Contraseña"
              type="password"
              placeholder="********"
              validations={["required", "passLen"]}
            />

            <Input
              name="passwordRepeat"
              label="Repetir Contraseña"
              type="password"
              placeholder="********"
              validations={["required"]}
              customValidations={[
                (value) => {
                  if (
                    formState.password !== "" &&
                    formState.password === value
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
              className={`button is-success ${isLoading ? "is-loading" : ""}`}
              onClick={handleCreate}
            >
              Registrar
            </button>

            <button
              className={`button is-danger ${isLoading ? "is-loading" : ""}`}
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </footer>
        </article>
      )}
    </section>
  );
};

export default Register;
