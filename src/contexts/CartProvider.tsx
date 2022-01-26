import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";

interface CartProviderProps {
  children: ReactNode;
}
interface Product {
  id: string;
  img: string;
  name: string;
  type: string;
  price: number;
}
interface Cart {
  id: string;
  img: string;
  name: string;
  type: string;
  price: number;
  userId: string;
  qtdProduct: number;
}
interface CartContextData {
  cart: Cart[];
  getCart: (id: string) => Promise<void>;
  addToCart: (product: Product, id: string) => Promise<void>;
  deleteToCart: (idCart: string) => Promise<void>;
  plusToCart: (product: Cart) => Promise<void>;
  removeToCart: (product: Cart) => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart[]>([] as Cart[]);

  const getCart = useCallback(async (id: string) => {
    const token = localStorage.getItem("@BurgueKenzie-token");
    await api
      .get(`/cart?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  const addToCart = useCallback(
    async (product: Product, id: string) => {
      const token = localStorage.getItem("@BurgueKenzie-token");
      const item = cart.find((i) => product.id === i.id);
      if (item) {
        await api
          .patch(
            `/cart/${item.id}`,
            { qtdProduct: item.qtdProduct + 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setCart((oldList) => [
              ...oldList.map((i) => {
                if (response.data.id === i.id) {
                  return response.data;
                }
                return i;
              }),
            ]);
          });
      } else {
        await api
          .post(
            "/cart",
            { ...product, qtdProduct: 1, userId: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setCart((oldList) => [...oldList, response.data]);
          });
      }
    },
    [cart]
  );

  const deleteToCart = useCallback(async (idCart: string) => {
    const token = localStorage.getItem("@BurgueKenzie-token");
    await api
      .delete(`/cart/${idCart}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCart((oldList) => oldList.filter((item) => item.id !== idCart));
      });
  }, []);

  const plusToCart = useCallback(
    async (product: Cart) => {
      const token = localStorage.getItem("@BurgueKenzie-token");
      const item = cart.find((i) => product.id === i.id);
      if (item) {
        await api
          .patch(
            `/cart/${product.id}`,
            { qtdProduct: product.qtdProduct + 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setCart((oldList) => [
              ...oldList.map((i) => {
                if (response.data.id === i.id) {
                  return response.data;
                }
                return i;
              }),
            ]);
          });
      }
    },
    [cart]
  );

  const removeToCart = useCallback(
    async (product: Cart) => {
      const token = localStorage.getItem("@BurgueKenzie-token");
      const item = cart.find((i) => product.id === i.id);
      if (item) {
        await api
          .patch(
            `/cart/${product.id}`,
            { qtdProduct: product.qtdProduct - 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setCart((oldList) => [
              ...oldList.map((i) => {
                if (response.data.id === i.id) {
                  return response.data;
                }
                return i;
              }),
            ]);
          });
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        deleteToCart,
        plusToCart,
        removeToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
