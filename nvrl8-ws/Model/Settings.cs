﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class Settings
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string Time { get; set; }

        public Settings(int id, string origin, string destination, string time)
        {
            Id = id;
            Origin = origin;
            Destination = destination;
            Time = time;
        }

        public Settings()
        {
            
        }
    }
}
