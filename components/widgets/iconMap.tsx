import { ExternalLink, Github, Mail, Phone, Trophy, Users } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    github: <Github size={14} />,
    mail: <Mail size={14} />,
    phone: <Phone size={14} />,
    trophy: <Trophy size={12} />,
    users : <Users size={12} />
}

export default function Icon(icon: string){
    return iconMap[icon] || <ExternalLink size={14} />;
}