import DetailsEvent from '@/components/events/detailsEvent'

const EventDetails = ({params}) => {
  return <DetailsEvent eventID={params.eventID} ownerID={params.ownerID} />;
}

export default EventDetails;
