// Who is responsible for the data (GDPR art. 13). One place, used by the
// privacy page in both languages.
//
// TODO before launch: fill in the legal entity (company name, tax ID, address).
// The privacy page states that Amble is the controller; a registered entity has
// to stand behind that name.
export const legal = {
  controller: 'Amble',
  entity: null as null | { name: string; taxId: string; address: string },
  privacyEmail: 'privacy@amble.fyi',
  updated: '2026-09-26',
};
