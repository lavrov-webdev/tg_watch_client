// Mock API server with watch mode support
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000']
}));
app.use(express.json());

// Mock data from example.txt
const chats = [
  {
    id: "6ea07db0-ec6d-4da1-8f36-4f6f753b8241",
    name: "Chat name"
  },
  {
    id: "8f5e3a2b-1c4d-4e6f-9a8b-7c6d5e4f3a2b",
    name: "Work chat"
  },
  {
    id: "3b2a1c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Family group"
  },
  {
    id: "9a8b7c6d-5e4f-3a2b-1c0d-2e3f4a5b6c7d",
    name: "Project discussion"
  }
];

const chatDetails = {
  "6ea07db0-ec6d-4da1-8f36-4f6f753b8241": {
    id: "6ea07db0-ec6d-4da1-8f36-4f6f753b8241",
    name: "Chat name",
    messages: [
      {
        id: "3f5172e5-bf57-4895-981f-bc82c5d94133",
        history: [
          {
            id: "c57b0ae9-d4cd-4c6d-af39-38dceba982c0",
            type: "created",
            payload: `# How to Make a Perfect Cup of Coffee

Making a perfect cup of coffee is an art and a science. Here's a step-by-step guide to help you brew a delicious cup of coffee at home.

## Ingredients

- Freshly ground coffee (1-2 tablespoons per cup)
- Water (filtered is best)
- Milk or cream (optional)
- Sugar or sweetener (optional)

## Equipment

- Coffee maker or French press
- Coffee grinder (if using whole beans)
- Kettle or pot
- Mug

## Instructions

1. **Select Your Coffee Beans**
   - Choose high-quality coffee beans.
   - Consider the roast type: light, medium, or dark, depending on your preference.

2. **Grind the Coffee Beans**
   - Use a coffee grinder to grind your coffee beans to the desired coarseness.
   - For drip coffee makers, use a medium grind.
   - For a French press, use a coarser grind.

3. **Boil the Water**
   - Heat water to approximately 200°F (93°C). This is just below boiling point.
   - If you don't have a thermometer, let boiling water sit for 30 seconds.

4. **Measure the Coffee**
   - Use 1 to 2 tablespoons of coffee per 6 ounces (180 ml) of water, depending on how strong you like your coffee.

5. **Brew the Coffee**
   - In a drip coffee maker: Add water to the reservoir, place the filter with ground coffee in the basket, and start the machine.
   - For a French press: Add coffee grounds to the press, pour in hot water, stir with a spoon, place the lid on top, and let it steep for 4 minutes. Then, slowly press the plunger down.

6. **Customize Your Coffee**
   - Add milk, cream, sugar, or sweetener if desired.

7. **Enjoy**
   - Pour the coffee into your favorite mug and enjoy!

## Tips

- For the best flavor, use freshly ground coffee and filtered water.
- Experiment with different coffee-to-water ratios and brewing times to find your perfect cup.
- Store beans in an airtight container in a cool, dark place.

Enjoy the process of making coffee and savor every sip! ☕

`,
            date: 978307200000
          },
          {
            id: "69bcf336-c962-48fc-8e0c-88cd07f610c4",
            type: "edited",
            payload: "Text after edit",
            date: 978393600000
          },
          {
            id: "524b0cc8-4ecb-4e85-b9c1-7f6dbe18dd63",
            type: "deleted",
            date: 978393600000
          }
        ]
      },
      {
        id: "4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d",
        history: [
          {
            id: "5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e",
            type: "created",
            payload: "How's everyone doing today?",
            date: 978480000000
          },
          {
            id: "6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f",
            type: "edited",
            payload: "How's everyone doing this week? How's everyone doing this week? How's everyone doing this week? How's everyone doing this week? How's everyone doing this week?",
            date: 978566400000
          }
        ]
      },
      {
        id: "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
        history: [
          {
            id: "8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b",
            type: "created",
            payload: "Let's schedule a meeting",
            date: 978652800000
          },
          {
            id: "9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
            type: "edited",
            payload: "Let's schedule a team meeting",
            date: 978739200000
          },
          {
            id: "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
            type: "deleted",
            date: 978825600000
          }
        ]
      },
      {
        id: "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        history: [
          {
            id: "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
            type: "created",
            payload: "New project update available",
            date: 978912000000
          },
          {
            id: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8g",
            type: "edited",
            payload: "New project update: version 2.0",
            date: 978998400000
          }
        ]
      },
      {
        id: "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
        history: [
          {
            id: "5d6e7f8g-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
            type: "created",
            payload: "Don't forget the deadline",
            date: 979084800000
          }
        ]
      },
      {
        id: "6e7f8g9h-0i1j-2k3l-4m5n-6o7p8q9r0s1t",
        history: [
          {
            id: "7f8g9h0i-1j2k-3l4m-5n6o-7p8q9r0s1t2u",
            type: "created",
            payload: "I'll be out of office tomorrow",
            date: 979171200000
          },
          {
            id: "8g9h0i1j-2k3l-4m5n-6o7p-8q9r0s1t2u3v",
            type: "edited",
            payload: "I'll be out of office on Friday",
            date: 979257600000
          },
          {
            id: "9h0i1j2k-3l4m-5n6o-7p8q-9r0s1t2u3v4w",
            type: "deleted",
            date: 979344000000
          }
        ]
      },
      {
        id: "0i1j2k3l-4m5n-6o7p-8q9r-0s1t2u3v4w5x",
        history: [
          {
            id: "1j2k3l4m-5n6o-7p8q-9r0s-1t2u3v4w5x6y",
            type: "created",
            payload: "Please review the latest changes",
            date: 979430400000
          },
          {
            id: "2k3l4m5n-6o7p-8q9r-0s1t-2u3v4w5x6y7z",
            type: "edited",
            payload: "Please review the latest design changes",
            date: 979516800000
          }
        ]
      }
    ]
  },
  "8f5e3a2b-1c4d-4e6f-9a8b-7c6d5e4f3a2b": {
    id: "8f5e3a2b-1c4d-4e6f-9a8b-7c6d5e4f3a2b",
    name: "Work chat",
    messages: [
      {
        id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        history: [
          {
            id: "7d8e9f0a-1b2c-3d4e-5f6g-7h8i9j0k1l2m",
            type: "created",
            payload: "Meeting at 3pm **tomorrow**",
            date: 1742054400000
          }
        ]
      },
      {
        id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        history: [
          {
            id: "8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n",
            type: "created",
            payload: "Project deadline extended",
            date: 1742140800000
          },
          {
            id: "9f0a1b2c-3d4e-5f6g-7h8i-9j0k1l2m3n4o",
            type: "edited",
            payload: "Project deadline extended to next week",
            date: 1742227200000
          }
        ]
      },
      {
        id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        history: [
          {
            id: "0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            type: "created",
            payload: "New client requirements",
            date: 1742313600000
          }
        ]
      },
      {
        id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9g",
        history: [
          {
            id: "1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q",
            type: "created",
            payload: "Team lunch next Friday",
            date: 1742400000000
          },
          {
            id: "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
            type: "edited",
            payload: "Team lunch at 1pm next Friday",
            date: 1742486400000
          },
          {
            id: "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
            type: "deleted",
            date: 1742572800000
          }
        ]
      },
      {
        id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9g0h",
        history: [
          {
            id: "4e5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
            type: "created",
            payload: "Vacation schedule updated",
            date: 1742659200000
          },
          {
            id: "5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u",
            type: "edited",
            payload: "Summer vacation schedule updated",
            date: 1742745600000
          }
        ]
      },
      {
        id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9g0h1i",
        history: [
          {
            id: "6g7h8i9j-0k1l-2m3n-4o5p-6q7r8s9t0u1v",
            type: "created",
            payload: "New office policy",
            date: 1742832000000
          }
        ]
      },
      {
        id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9g0h1i2j",
        history: [
          {
            id: "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w",
            type: "created",
            payload: "Performance reviews next month",
            date: 1742918400000
          },
          {
            id: "8i9j0k1l-2m3n-4o5p-6q7r-8s9t0u1v2w3x",
            type: "edited",
            payload: "Q2 performance reviews next month",
            date: 1743004800000
          },
          {
            id: "9j0k1l2m-3n4o-5p6q-7r8s-9t0u1v2w3x4y",
            type: "deleted",
            date: 1743091200000
          }
        ]
      }
    ]
  },
  "3b2a1c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d": {
    id: "3b2a1c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Family group",
    messages: [
      {
        id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        history: [
          {
            id: "8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n",
            type: "created",
            payload: "Don't forget grandma's birthday!",
            date: 1742486400000
          },
          {
            id: "9a8b7c6d-5e4f-3a2b-1c0d-2e3f4a5b6c7d",
            type: "edited",
            payload: "Don't forget grandma's birthday on Saturday!",
            date: 1742572800000
          }
        ]
      },
      {
        id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        history: [
          {
            id: "0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            type: "created",
            payload: "Who's bringing dessert?",
            date: 1742659200000
          },
          {
            id: "1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q",
            type: "edited",
            payload: "Who's bringing the birthday cake?",
            date: 1742745600000
          }
        ]
      },
      {
        id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9g",
        history: [
          {
            id: "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
            type: "created",
            payload: "I'll bring the drinks",
            date: 1742832000000
          }
        ]
      },
      {
        id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9g0h",
        history: [
          {
            id: "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
            type: "created",
            payload: "What time should we arrive?",
            date: 1742918400000
          },
          {
            id: "4e5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
            type: "edited",
            payload: "What time is the party starting?",
            date: 1743004800000
          },
          {
            id: "5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u",
            type: "deleted",
            date: 1743091200000
          }
        ]
      },
      {
        id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9g0h1i",
        history: [
          {
            id: "6g7h8i9j-0k1l-2m3n-4o5p-6q7r8s9t0u1v",
            type: "created",
            payload: "I made a reservation at the restaurant",
            date: 1743177600000
          },
          {
            id: "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w",
            type: "edited",
            payload: "I made a reservation for 15 people",
            date: 1743264000000
          }
        ]
      },
      {
        id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9g0h1i2j",
        history: [
          {
            id: "8i9j0k1l-2m3n-4o5p-6q7r-8s9t0u1v2w3x",
            type: "created",
            payload: "Grandma's favorite flowers are roses",
            date: 1743350400000
          }
        ]
      },
      {
        id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9g0h1i2j3k",
        history: [
          {
            id: "9j0k1l2m-3n4o-5p6q-7r8s-9t0u1v2w3x4y",
            type: "created",
            payload: "I'll pick up mom on the way",
            date: 1743436800000
          },
          {
            id: "0k1l2m3n-4o5p-6q7r-8s9t-0u1v2w3x4y5z",
            type: "edited",
            payload: "I'll pick up mom at 5pm",
            date: 1743523200000
          },
          {
            id: "1l2m3n4o-5p6q-7r8s-9t0u-1v2w3x4y5z6a",
            type: "deleted",
            date: 1743609600000
          }
        ]
      }
    ]
  },
  "9a8b7c6d-5e4f-3a2b-1c0d-2e3f4a5b6c7d": {
    id: "9a8b7c6d-5e4f-3a2b-1c0d-2e3f4a5b6c7d",
    name: "Project discussion",
    messages: [
      {
        id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        history: [
          {
            id: "0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            type: "created",
            payload: "Let's discuss the new UI design",
            date: 1741564800000
          },
          {
            id: "1b2c3d4e-5f6g-7h8i-9j0k-1l2m3n4o5p6q",
            type: "created",
            payload: "I've uploaded the mockups",
            date: 1741651200000
          }
        ]
      },
      {
        id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9g",
        history: [
          {
            id: "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
            type: "created",
            payload: "Feedback on the color scheme",
            date: 1741737600000
          },
          {
            id: "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
            type: "edited",
            payload: "Feedback on the primary color scheme",
            date: 1741824000000
          },
          {
            id: "4e5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
            type: "deleted",
            date: 1741910400000
          }
        ]
      },
      {
        id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9g0h",
        history: [
          {
            id: "5f6g7h8i-9j0k-1l2m-3n4o-5p6q7r8s9t0u",
            type: "created",
            payload: "New design system guidelines",
            date: 1741996800000
          }
        ]
      },
      {
        id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9g0h1i",
        history: [
          {
            id: "6g7h8i9j-0k1l-2m3n-4o5p-6q7r8s9t0u1v",
            type: "created",
            payload: "Accessibility improvements needed",
            date: 1742083200000
          },
          {
            id: "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w",
            type: "edited",
            payload: "WCAG 2.1 accessibility improvements needed",
            date: 1742169600000
          }
        ]
      },
      {
        id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9g0h1i2j",
        history: [
          {
            id: "8i9j0k1l-2m3n-4o5p-6q7r-8s9t0u1v2w3x",
            type: "created",
            payload: "Mobile responsiveness issues",
            date: 1742256000000
          }
        ]
      },
      {
        id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9g0h1i2j3k",
        history: [
          {
            id: "9j0k1l2m-3n4o-5p6q-7r8s-9t0u1v2w3x4y",
            type: "created",
            payload: "User testing results are in",
            date: 1742342400000
          },
          {
            id: "0k1l2m3n-4o5p-6q7r-8s9t-0u1v2w3x4y5z",
            type: "edited",
            payload: "Round 1 user testing results",
            date: 1742428800000
          },
          {
            id: "1l2m3n4o-5p6q-7r8s-9t0u-1v2w3x4y5z6a",
            type: "deleted",
            date: 1742515200000
          }
        ]
      },
      {
        id: "9c0d1e2f-3a4b-5c6d-7e8f-9g0h1i2j3k4l",
        history: [
          {
            id: "2m3n4o5p-6q7r-8s9t-0u1v-2w3x4y5z6a7b",
            type: "created",
            payload: "Final approval for production",
            date: 1742601600000
          },
          {
            id: "3n4o5p6q-7r8s-9t0u-1v2w-3x4y5z6a7b8c",
            type: "edited",
            payload: "Final UI design approval",
            date: 1742688000000
          }
        ]
      }
    ]
  }
};

// Endpoints
app.get('/chats', (_req: Request, res: Response) => {
  res.json(chats);
});

app.get('/chats/:id', (req: Request, res: Response) => {
  const chat = chatDetails[req.params.id as keyof typeof chatDetails];
  if (chat) {
    res.json(chat);
  } else {
    res.status(404).json({ error: 'Chat not found' });
  }
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
