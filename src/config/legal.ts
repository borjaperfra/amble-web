// Who is responsible for the data (GDPR art. 13). One place, used by the
// privacy page in both languages.
//
// No company yet: Amble is run by Borja, who is the controller. When there is a
// registered entity, add it here (name, tax ID, address) and it replaces him.
export const legal = {
  controller: 'Amble',
  operator: 'Borja Pérez Francés',
  entity: null as null | { name: string; taxId: string; address: string },
  privacyEmail: 'privacy@amble.fyi',
  updated: '2026-10-02',
};
