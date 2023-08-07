import { useContext } from "react";
import { UserListContext } from "../../providers/Users";
import { userContext } from "../../providers/Contacts";
import { StyledCardcontacts } from "./cardContacts.style";

function CardsContactsDashboard() {
  const { setOpen } = useContext(UserListContext);

  const { contactsUser, setContactId, setContactFounded, setOpenEd } =
    useContext(userContext);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleClickToOpenEd = (id: number) => {
    setContactId(id);

    const searchContact = contactsUser.find((contact) => {
      if (contact.id == id) {
        return contact;
      }
    });

    setContactFounded(searchContact);

    if (contactsUser) {
      setOpenEd(true);
    }
  };

  return (
    <StyledCardcontacts>
      <div>
        <h2>Contatos</h2>
        <h2 onClick={handleClickToOpen} className="add-contact">
          +
        </h2>
      </div>
      <ul>
        {contactsUser.map((contact) => {
          return (
            <li
              id={String(contact.id)}
              key={contact.id}
              onClick={() => handleClickToOpenEd(contact.id)}
            >
              <h2>{contact.name}</h2>
              <p>{contact.email}</p>
              <p>{contact.telefone}</p>
            </li>
          );
        })}
      </ul>
    </StyledCardcontacts>
  );
}

export default CardsContactsDashboard;
