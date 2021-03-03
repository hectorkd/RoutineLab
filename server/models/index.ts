import mongoose from 'mongoose';

mongoose.connect(`mongodb://localhost:27017/gymnasticsdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

export default mongoose;