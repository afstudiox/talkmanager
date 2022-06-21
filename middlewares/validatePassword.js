// função que faz a validação do password
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  // valida se o password foi passado
  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  // valida se o password tem pelo menos 6 caracteres
  if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validatePassword;