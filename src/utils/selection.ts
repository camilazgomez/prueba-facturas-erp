// Agrega o quita un ID de un Set dependiendo si ya estaba o no.
// Devuelve un nuevo Set con el cambio aplicado.
// Útil para manejar selecciones tipo toggle.

export function toggleSetSelection(
  id: string,
  set: Set<string>,
): Set<string> {
  const next = new Set(set);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}