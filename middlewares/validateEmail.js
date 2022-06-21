const validateEmail = (req, res, next) => {
  const { email } = req.body;
  // valida se o email foi passado 
  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // valida se foi passado um email válido
  const regex = /\S+@\S+\.\S+/;
  const testEmail = regex.test(email);
  if (!testEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;