import useFetch from '../hooks/useFetch';
import './DiscordInvite.scss';

interface DiscordInviteProps {
    inviteCode: string;
    overrides?: {
        banner?: string | null;
        icon?: string;
        guildName?: string;
        inviteLink?: string;
    };
    className?: string;
}

interface DiscordInviteData {
    type: number;
    code: string;
    inviter: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: string | null;
        accent_color: number | null;
        global_name: string | null;
        avatar_decoration_data: any | null;
        banner_color: string | null;
        clan: any | null;
        primary_guild: any | null;
    };
    expires_at: string | null;
    flags: number;
    guild: {
        id: string;
        name: string;
        splash: string | null;
        banner: string | null;
        description: string | null;
        icon: string | null;
        features: string[];
        verification_level: number;
        vanity_url_code: string | null;
        nsfw_level: number;
        nsfw: boolean;
        premium_subscription_count: number;
    };
    guild_id: string;
    channel: {
        id: string;
        type: number;
        name: string;
    };
    approximate_member_count: number;
    approximate_presence_count: number;
}

const DiscordInvite = ({
    inviteCode,
    className,
    overrides,
}: DiscordInviteProps) => {
    const [inviteData, loading, error] = useFetch<DiscordInviteData>(
        `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`
    );

    if (loading) return <p>Loading...</p>;
    if (error || inviteData === null) return <p>Error: {error}</p>;

    let banner: string | null = null;
    if (inviteData.guild.splash)
        banner = `https://cdn.discordapp.com/splashes/${inviteData.guild.id}/${inviteData.guild.splash}.jpg?size=480`;
    if (overrides?.banner) banner = overrides.banner;
    if (overrides?.banner === null) banner = null;

    const icon =
        overrides?.icon ||
        `https://cdn.discordapp.com/icons/${inviteData.guild.id}/${inviteData.guild.icon}.png`;
    const guildName = overrides?.guildName || inviteData.guild.name;
    const inviteLink =
        overrides?.inviteLink || `https://discord.gg/${inviteData.code}`;

    return (
        <div className={`discordInvite ${className || ''}`}>
            {banner && (
                <img
                    className="banner"
                    src={banner}
                    alt={`${guildName} banner`}
                />
            )}
            <div className="bottom">
                <img className="icon" src={icon} alt={`${guildName} icon`} />
                <div className="text">
                    <span className="title">{guildName}</span>
                    <div className="members">
                        <div className="memcount">
                            <div className="dot green"></div>
                            <span>
                                {inviteData.approximate_presence_count} Online
                            </span>
                        </div>
                        <div className="memcount">
                            <div className="dot grey"></div>
                            <span>
                                {inviteData.approximate_member_count} Members
                            </span>
                        </div>
                    </div>
                </div>
                <a
                    href={inviteLink}
                    className="button joinbtn"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Join
                </a>
            </div>
        </div>
    );
};

export default DiscordInvite;
