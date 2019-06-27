import * as Yup from 'yup';

export async function createUser(req, res, next) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  if (!(await schema.isValid(req.body)))
    return res.status(400).json({ error: 'Validation failed' });

  return next();
}

export async function updateUser(req, res, next) {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  if (!(await schema.isValid(req.body)))
    return res.status(400).json({ error: 'Validation failed' });

  return next();
}
