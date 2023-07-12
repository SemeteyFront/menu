export interface Menu  {
  id: number
  name: string
  price: number
  url: string
  description: string
  count: number
}

export interface Categories {
  name: string
  id: number
}

export interface ModalComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};