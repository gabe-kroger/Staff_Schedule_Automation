module.exports = () => {
  const ErrorSchema = mongoose.Schema({
    error: { type: String },
  });

  return mongoose.model('error', ErrorSchema);
};
