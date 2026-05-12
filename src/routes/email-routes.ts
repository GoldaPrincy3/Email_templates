import express, { Request, Response } from "express";

const router = express.Router();

interface Badge {
  label: string;
}

interface Alert {
  type: string;
  label: string;
}

interface Row {
  label: string;
  value: string;
  highlight?: boolean;
  badge?: Badge;
}

interface Section {
  title: string;
  rows: Row[];
}

interface EmailTemplate {
  title: string;
  userName?: string;
  message: string;
  buttonText: string;
  buttonColor: string;
  licenseKey?: string;

  alert?: Alert;
  secondaryBadge?: Badge;

  sections: Section[];
}

const emails: Record<string, EmailTemplate> = {
  newuser: {
    title: "New User Created",

    userName: "John Doe",

    message: "A new user account has been successfully created.",

    buttonText: "View Device Details",

    buttonColor: "#1A73E8",

    alert: {
      type: "information",
      label: "INFORMATION",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    sections: [
      {
        title: "USER DETAILS",

        rows: [
          { label: "Name", value: "John Doe" },

          { label: "Email", value: "john@gmail.com" },

          { label: "Phone", value: "123-456-7890" },

          { label: "Role", value: "Admin" },

          { label: "Group", value: "-" },
        ],
      },

      {
        title: "CREATED DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam.carter@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Date",

            value: "11-02-2026,10:00 AM",
          },
        ],
      },
    ],
  },

  vms: {
    title: "New VMS License Created",

    message: "A new VMS license has been successfully created.",

    licenseKey: "YTMG3-N6DKC-DKB77-7M9GH-8HVX7",

    buttonText: "View VMS License",

    buttonColor: "#1A73E8",

    alert: {
      type: "critical",
      label: "CRITICAL",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    sections: [
      {
        title: "LICENSE DETAILS",

        rows: [
          {
            label: "Name",
            value: "LIC202502 (VMS)",
          },

          {
            label: "Devices",
            value: "200",
          },

          {
            label: "Sites",
            value: "20",
          },

          {
            label: "Users",
            value: "15",
          },

          {
            label: "Mobile Users",
            value: "5",
          },
        ],
      },

      {
        title: "CREATED DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Created On",

            value: "11-02-2026, 10:00 AM",
          },
        ],
      },
    ],
  },
 ai: {
  
    title: "New AI License Created",

    message: "A new AI license has been successfully created.",

    licenseKey: "YTMG3-N6DKC-DKB77-7M9GH-8HVX7",

    buttonText: "View AI License",

    buttonColor: "#1A73E8",

    alert: {
      type: "critical",
      label: "CRITICAL",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    sections: [
      {
        title: "LICENSE DETAILS",

        rows: [
          {
            label: "Name",
            value: "LIC202502 (AI)",
          },

          {
            label: "Intrusion Person",
            value: "10",
          },

          {
            label: "Loitering Detection",
            value: "4",
          },

          {
            label: "Object Detection",
            value: "8",
          },

          {
            label: "Fallen Person ",
            value: "2",
          },
           {
            label: "Line Crossing",
            value: "3",
          },
        ],
      },

      {
        title: "CREATED DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Created On",

            value: "11-02-2026, 10:00 AM",
          },
        ],
      },
    ],
  },
   expired: {
    title: "License Expired",

    userName: "John Doe",

    message: "VMS license is expired on 28-02-2026, 10:00 AM.",

    alert: {
      type: "critical",
      label: "CRITICAL",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    buttonText: "View License Details",

    buttonColor: "#FF3B30",

    sections: [
      {
        title: "LICENSE DETAILS",

        rows: [
          {
            label: "Name",
            value: "LIC202502 (VMS)",
            highlight: true,
          },

          {
            label: "Devices",
            value: "200",
          },

          {
            label: "Sites",
            value: "20",
          },

          {
            label: "Users",
            value: "15",
          },

          {
            label: "Mobile Users",
            value: "5",
          },

          {
            label: "VMS Connected",
            value: "3",
          },
        ],
      },

      {
        title: "EXPIRY DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Created On",

            value: "11-02-2025, 10:00 AM",
          },

          {
            label: "Expiry Date",

            value: "28-02-2026, 10:00 AM",

            highlight: true,
          },
        ],
      },
    ],
  },
  aboutToExpire: {
    title: "License About to Expire",

    userName: "John Doe",

    message: "VMS license is about to expire on 28-02-2026, 10:00 AM.",

    alert: {
      type: "critical",
      label: "CRITICAL",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    buttonText: "View License Details",

    buttonColor: "#1A73E8",

    sections: [
      {
        title: "LICENSE DETAILS",

        rows: [
          {
            label: "Name",
            value: "LIC202502 (VMS)",
     
          },

          {
            label: "Devices",
            value: "200",
          },

          {
            label: "Sites",
            value: "20",
          },

          {
            label: "Users",
            value: "15",
          },

          {
            label: "Mobile Users",
            value: "5",
          },

          {
            label: "VMS Connected",
            value: "3",
          },
        ],
      },

      {
        title: "EXPIRY DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Created On",

            value: "11-02-2025, 10:00 AM",
          },

          {
            label: "Expiry Date",

            value: "28-02-2026, 10:00 AM",

            highlight: true,
          },
        ],
      },
    ],
  },
  deviceoffline: {
     title: "Device Went Offline",

    userName: "John Doe",

    message: "Front-Entrance-Cam device went offline from 11-02-2026,10:00 AM ",

    alert: {
      type: "critical",
      label: "CRITICAL",
    },

    secondaryBadge: {
      label: "License Alert",
    },

    buttonText: "View License Details",

    buttonColor: "#FF3B30",

    sections: [
      {
        title: "DEVICE DETAILS",

        rows: [
          {
            label: "Name",
            value: "Front-Entrance-Cam",
          
          },

          {
            label: "IP",
            value: "192.168.1.102",
          },

          {
            label: "Hierarchy",
            value: "Bel Railways > SC",
          },

        ],
      },

      {
        title: "EXPIRY DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Contact",

            value: "+91 9876543210",
          },

        ],
      },
    ],
},
  newsite: {
     title: "New Site Created",

    userName: "John Doe",

    message: "Front-Entrance-Cam device went offline from 11-02-2026,10:00 AM ",

    alert: {
      type: "warning",
      label: "WARNING",
    },

    

    buttonText: "View License Details",

    buttonColor: "#1A73E8",

    sections: [
      {
        title: "DEVICE DETAILS",

        rows: [
          {
            label: "Name",
            value: "Front-Entrance-Cam",
          
          },

          {
            label: "IP",
            value: "192.168.1.102",
          },

          {
            label: "Hierarchy",
            value: "Bel Railways > SC",
          },

        ],
      },

      {
        title: "EXPIRY DETAILS",

        rows: [
          {
            label: "Created By",

            value: "Liam Carter (liam@example.com)",

            badge: {
              label: "SUPER ADMIN",
            },
          },

          {
            label: "Contact",

            value: "+91 9876543210",
          },

        ],
      },
    ],
}
};

router.get("/send/:type", (req, res) => {

  const type =
    req.params.type as keyof typeof emails;

  const email = emails[type];

  if (!email) {
    return res.send("Invalid Email Type");
  }

  res.render("new-user", {
    layout: "main",

    userName: email.userName || "John Doe",

    title: email.title,
    message: email.message,

    alert: email.alert,
    secondaryBadge: email.secondaryBadge,

    sections: email.sections,

   LicenseKey: email.licenseKey || null,

    buttonText: email.buttonText,
    buttonColor: email.buttonColor,
  });
});

export default router;