import * as Yup from 'yup';

export const initialProductsValues = {
  id: "",
  name: "",
  description: "",
  logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  date_release: "",
  date_revision: ""
};

export const addProductSchema = Yup.object().shape({
  id: Yup.string()
    .required('ID es requerido')
    .min(3, 'ID debe tener al menos 3 caracteres')
    .max(10),
  name: Yup.string()
    .required('Nombre es requerido')
    .min(5, 'Nombre debe tener al menos 5 caracteres')
    .max(100),
  description: Yup.string()
    .required('Descripción es requerida')
    .min(10, 'Ingresa al menos 10 caracteres y máximo 200')
    .max(200),
  logo: Yup.string().required('Logo es requerido'),
  date_release: Yup.string().required('Fecha de liberación es requerida'),
  date_revision: Yup.string()
});
