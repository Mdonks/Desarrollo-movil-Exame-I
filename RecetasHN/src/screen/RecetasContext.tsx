import React, { createContext, useState, ReactNode } from "react";

interface Receta {
  recetaID: number;
  nombre: string;
  ingredientes: string;
}

interface RecetasContextProps {
  recetas: Receta[];
  agregarReceta: (receta: Receta) => void;
  eliminarReceta: (recetaID: number) => void;
}

export const RecetasContext = createContext<RecetasContextProps | undefined>(
  undefined
);

interface RecetasProviderProps {
  children: ReactNode;
}

export const RecetasProvider: React.FC<RecetasProviderProps> = ({
  children,
}) => {
  const [recetas, setRecetas] = useState<Receta[]>([]);

  const agregarReceta = (receta: Receta) => {
    setRecetas((prevRecetas) => [...prevRecetas, receta]);
  };

  const eliminarReceta = (recetaID: number) => {
    setRecetas((prevRecetas) =>
      prevRecetas.filter((receta) => receta.recetaID !== recetaID)
    );
  };

  return (
    <RecetasContext.Provider value={{ recetas, agregarReceta, eliminarReceta }}>
      {children}
    </RecetasContext.Provider>
  );
};