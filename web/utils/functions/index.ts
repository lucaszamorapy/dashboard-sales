import axios from "axios";
import { toast } from "sonner";
import moment from 'moment';

export const getCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response.data;
  } catch (error) {
    console.log(error)
    toast.error("Erro ao obter dados do Via CEP")
  }
}

export const formatDate = (value: Date) => {
  return moment(value).format('DD/MM/yyyy')
}