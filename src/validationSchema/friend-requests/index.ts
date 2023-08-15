import * as yup from 'yup';

export const friendRequestValidationSchema = yup.object().shape({
  sender_id: yup.string().nullable(),
  receiver_id: yup.string().nullable(),
});
